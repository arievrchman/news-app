const express = require('express')
const router = express.Router()
const YandexController = require('../controllers/yandex')
const NewsapiController = require('../controllers/newsapi')

router.get('/api/news/top-headlines', NewsapiController.getTopHeadlines)
router.get('/api/news/everything', NewsapiController.getEverything)
router.get('/api/news/sources', NewsapiController.getSources)

router.get('/api/translate/:lang/:text', YandexController.translate)

router.get('/', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})

module.exports = router
