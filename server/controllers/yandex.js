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
            let titleRequest = 'key=' + process.env.YANDEX_KEY
            titleRequest += '&lang=' + translateTo
            newsData.articles.forEach((e, i) => {
                titleRequest += '&text=' + e.title
            })
            let translatedTitles = await axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate`, titleRequest)

            let descriptionRequest = 'key=' + process.env.YANDEX_KEY
            descriptionRequest += '&lang=' + translateTo
            newsData.articles.forEach((e, i) => {
                descriptionRequest += '&text=' + e.description
            })
            let translatedDescriptions = await axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate`, descriptionRequest)

            newsData.articles.forEach((e, i) => {
                newsData.articles[i].translated_title = translatedTitles.data.text[i]
                newsData.articles[i].translated_description = translatedDescriptions.data.text[i]
            })
            return newsData
        } catch (err) {
            throw err
        }
    }
}

module.exports = YandexController
