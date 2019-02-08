const express = require('express')
const router = express.Router()
const YandexController = require('../controllers/yandex')
const NewsapiController = require('../controllers/newsapi')
const auth = require('../middlewares/authUser')



router.get('/', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})

router.use(auth)
router.get('/api/news/top-headlines', NewsapiController.getTopHeadlines)
router.get('/api/news/everything', NewsapiController.getEverything)
router.get('/api/news/sources', NewsapiController.getSources)

router.get('/api/translate/:lang/:text', YandexController.translate)

module.exports = router
