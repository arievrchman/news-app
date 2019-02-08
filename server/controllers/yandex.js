const axios = require('axios')

class YandexController {
    static async translate(req, res) {
        try {
            let postData = 'key=' + process.env.YANDEX_KEY
            postData += '&lang=' + req.body.lang
            postData += '&text=' + req.body.text
            let response = await axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate`, postData)
            res.status(200).json(response.data)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }

    static async getLangs(req, res) {
        try {
            let queryStr = '&key=' + process.env.YANDEX_KEY
            let response = await axios.get(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en` + queryStr)
            res.status(200).json(response.data)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }

    static async translateNewsapiData(req, res) {
        try {
            let data = req.body.data
            let translateTo = req.query.lang
            let newsData = await YandexController.translateNewsapi(data, translateTo)
            newsData.articles = newsData.articles.map(e => {
                e.original_title = e.title
                e.original_description = e.description
                e.title = e.translated_title
                e.description = e.translated_description
                return e
            })
            console.log(newsData)
            res.status(200).json(newsData)
        }
        catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }

    static async translateNewsapi(newsData, translateTo) {
        try {
            let translationRequest = 'key=' + process.env.YANDEX_KEY
            translationRequest += '&lang=' + translateTo
            newsData.articles.forEach((e, i) => {
                translationRequest += '&text=' + e.title
                translationRequest += '&text=' + e.description
            })
            let translatedArticles = await axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate`, translationRequest)

            newsData.articles.forEach((e, i) => {
                newsData.articles[i].translated_title = translatedArticles.data.text[i * 2]
                newsData.articles[i].translated_description = translatedArticles.data.text[i * 2 + 1]
            })
            return newsData
        } catch (err) {
            throw err
        }
    }
}

module.exports = YandexController
