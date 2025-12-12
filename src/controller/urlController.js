const urlModel = require('../models/urlModel');
const validUrl = require('valid-url');
const shortId = require('shortid');
const validation = require('../validation/validate')
const redis = require("redis");

const { promisify } = require("util");


const createShortUrl = async function (req, res) {
    try {
        
        let url = req.body.longUrl
        console.log(url);

        if (!validation.isValidField(url)) return res.status(400).send({ status: false, msg: 'url cannot be empty' })
        if (!validation.isValidUrl(url)) return res.status(400).send({ status: false, msg: 'enter valid url' })
        if (!validUrl.isUri(url.toString())) {
            return res.status(400).send({ status: false, msg: "enter valid url" })
        }

               
        let urlCode = shortId.generate()
        req.body.urlCode = urlCode
        
        let shortUrl = "https://shortlinxback.vercel.app/" + urlCode
        req.body.shortUrl = shortUrl
        
        let createdShortUrl = await urlModel.create(req.body)
        let { createdAt, updatedAt, __v, _id, ...result } = createdShortUrl._doc

        return res.status(201).send({ status: true, data: result })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

const getUrl = async function (req, res) {
    try {
        let urlCode = req.params.urlCode      
        if(!shortId.isValid(urlCode)) return res.status(400).send({ status: false, msg: 'invalid url code' }) 
        let findUrlCode = await urlModel.findOne({ urlCode: urlCode }).select({ longUrl: 1, _id: 0 })
        if (!findUrlCode)return res.status(404).send({ status: false, msg: 'Url not found' })
            console.log(findUrlCode.longUrl);
        return res.status(302).redirect( findUrlCode.longUrl )
        
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports = { createShortUrl, getUrl }





