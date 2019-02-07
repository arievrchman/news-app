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
}

module.exports = YandexController
