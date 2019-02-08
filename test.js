const axios = require('axios')

axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=2ee86e45c1cb43b5b559d8042d629fca')
    .then(response => {
        console.log(response.data)
        let postData = 'key=trnsl.1.1.20190207T110342Z.cc1d5129715cef02.e9d9a812b3decbeebbacf83debf990f722e9df4f'
        postData += '&lang=id'
        response.data.articles.forEach((v, i) => {
            postData += '&text=' + v.description
        })
        return axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate`, postData)
    })
    .then(response => {
        console.log(response.data.text)
    })
    .catch(err => {
        console.log(err)
    })
