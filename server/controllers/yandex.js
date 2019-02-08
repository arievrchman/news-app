const axios = require('axios')

class YandexController {
    static async translate(req, res) {
        try {
            let postData = 'key=' + process.env.YANDEX_KEY
            postData += '&lang=' + req.params.lang
            postData += '&text=' + req.params.text
            let response = await axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate`, postData)
            res.status(200).json(response.data)
        } catch (err) {
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
            })
            newsData.articles.forEach((e, i) => {
                translationRequest += '&text=' + e.description
            })
            let translatedArticles = await axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate`, translationRequest)

            newsData.articles.forEach((e, i) => {
                newsData.articles[i].translated_title = translatedArticles.data.text[i]
                newsData.articles[i].translated_description = translatedArticles.data.text[i + newsData.articles.length]
            })
            return newsData
        } catch (err) {
            throw err
        }
    }
}

module.exports = YandexController
