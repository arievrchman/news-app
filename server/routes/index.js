const express = require('express')
const router = express.Router()
const YandexController = require('../controllers/yandex')
const NewsapiController = require('../controllers/newsapi')

router.get('/api/news/top-headlines', NewsapiController.getTopHeadlines)
router.get('/api/news/everything', NewsapiController.getEverything)
router.get('/api/news/sources', NewsapiController.getSources)

router.post('/api/translate', YandexController.translate)
router.get('/api/translate/getLangs', YandexController.getLangs)
router.post('/api/translate/newsapiData', YandexController.translateNewsapiData)

router.get('/', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})

module.exports = router
