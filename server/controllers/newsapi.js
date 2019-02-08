const axios = require('axios')
const YandexController = require('./yandex')

class NewsapiController {
    static async getTopHeadlines(req, res) {
        try {
            let country = req.query.country || ''
            let category = req.query.category || ''
            let sources = req.query.sources || ''
            let q = req.query.q || ''
            let response = await axios.get(`https://newsapi.org/v2/top-headlines?q=${q}&category=${category}&sources=${sources}&country=${country}&apiKey=${process.env.NEWSAPI_KEY}`)
            let newsData = response.data
            if (req.query.translateTo) {
                newsData = await YandexController.translateNewsapi(newsData, req.query.translateTo)
            }
            res.status(200).json(newsData)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }
    static async getEverything(req, res) {
        try {
            let q = req.query.q || ''
            let sources = req.query.sources || ''
            let language = req.query.language || ''
            let sortBy = req.query.sortBy || ''
            let from = req.query.from || ''
            let to = req.query.to || ''
            let response = await axios.get(`https://newsapi.org/v2/everything?q=${q}&sources=${sources}&language=${language}&sortBy=${sortBy}&from=${from}&to=${to}&apiKey=${process.env.NEWSAPI_KEY}`)
            let newsData = response.data
            if (req.query.translateTo) {
                newsData = await YandexController.translateNewsapi(newsData, req.query.translateTo)
            }
            res.status(200).json(newsData)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }
    static async getSources(req, res) {
        try {
            let country = req.query.country || ''
            let category = req.query.category || ''
            let language = req.query.language || ''
            let response = await axios.get(`https://newsapi.org/v2/sources?country=${country}&category=${category}&language=${language}&apiKey=${process.env.NEWSAPI_KEY}`)
            let sourcesData = response.data
            res.status(200).json(sourcesData)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }
}

module.exports = NewsapiController
