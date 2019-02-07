const axios = require('axios')

class NewsapiController {
    static async getTopHeadlines(req, res) {
        try {
            let country = req.query.country || ''
            let category = req.query.category || ''
            let sources = req.query.sources || ''
            let q = req.query.q || ''
            let response = await axios.get(`https://newsapi.org/v2/top-headlines?q=${q}&category=${category}&sources=${sources}&country=${country}&apiKey=${process.env.NEWSAPI_KEY}`)
            res.status(200).json(response.data)
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
            let response = await axios.get(`https://newsapi.org/v2/everything?q=${q}&sources=${sources}&language=${language}&sortBy=${sortBy}&apiKey=${process.env.NEWSAPI_KEY}`)
            res.status(200).json(response.data)
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
            res.status(200).json(response.data)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }
}

module.exports = NewsapiController
