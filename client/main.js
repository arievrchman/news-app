let baseurl = 'http://localhost:3000'
let newsData = { articles: [] }

function showTopHeadlines() {
    $("#topHeadlinesForm").show()
    $('#everythingForm').hide()
    $('#translateForm').hide()
}

function showEverything() {
    $("#topHeadlinesForm").hide()
    $('#everythingForm').show()
    $('#translateForm').hide()
}

function showTranslate() {
    $("#topHeadlinesForm").hide()
    $('#everythingForm').hide()
    $('#translateForm').show()
}

function speak(newsDataIndex) {
    responsiveVoice.cancel()
    let title = newsData.articles[newsDataIndex].title
    let description = newsData.articles[newsDataIndex].description
    let author = newsData.articles[newsDataIndex].author
    let source = newsData.articles[newsDataIndex].source.name
    let text = `${title}. ${author}. ${source}. ${description}.`
    let voice = $('#voice').val()
    responsiveVoice.speak(text, voice)
}

function stopSpeak() {
    responsiveVoice.cancel()
}

function searchTopHeadlines() {
    $('#everything').hide()
    $('#topHeadlines').show()
    $('#topHeadlines').html('Please wait...')
    let url = `${baseurl}/api/news/top-headlines?`
    url += '&q=' + $('#topHeadlinesQ').val()
    url += '&country=' + $('#topHeadlinesCountry').val()
    url += '&category=' + $('#topHeadlinesCategory').val()
    $.ajax({ url })
        .done(response => {
            newsData = response
            let html = newsDataToHtml()
            $('#newsArticles').html(html)
        })
        .fail(response => {
            $('#newsArticles').text(JSON.stringify(response))
            console.log(response)
        })
}

function searchEverything() {
    $('#topHeadlines').hide()
    $('#everything').show()
    $('#everything').html('Please wait...')
    let url = `${baseurl}/api/news/everything?`
    url += '&q=' + $('#everythingQ').val()
    url += '&language=' + $('#everythingLanguage').val()
    url += '&sortBy=' + $('#everythingSortBy').val()
    url += '&from=' + $('#everythingFrom').val()
    url += '&to=' + $('#everythingTo').val()
    $.ajax({ url })
        .done(response => {
            newsData = response
            let html = newsDataToHtml()
            $('#newsArticles').html(html)
        })
        .fail(response => {
            $('#newsArticles').text(JSON.stringify(response))
            console.log(response)
        })
}

function translateNewsData() {
    $('#translation').html('Please wait...')
    let lang = $('#articlesTranslateTo').val()
    let url = `${baseurl}/api/translate/newsapiData?`
    url += `&lang=${lang}`
    $.ajax({
        url,
        data: JSON.stringify({ data: newsData }),
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
    })
        .done(response => {
            newsData = response
            let html = newsDataToHtml()
            $('#newsArticles').html(html)
        })
        .fail(response => {
            $('#newsArticles').text(JSON.stringify(response))
            console.log(response)
        })
}

function newsDataToHtml() {
    let html = ''
    newsData.articles.forEach((e, i) => {
        html +=
            `
        <div class="col-lg-6 col-md-12">
        <div class="single-news mb-4">
          <div class="view overlay rounded z-depth-1-half mb-4">
            <img class="img-fluid" src="${e.urlToImage}">
            <a>
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>
          
          <div class="news-data d-flex justify-content-between">
            
                <h6 class="font-weight-bold">
                    Author: ${e.author || ''}
                    <br>
                    Source: ${e.source.name || ''}
                </h6>
            
            <p class="font-weight-bold dark-grey-text">
                <i class="fas fa-clock-o pr-2">
                </i>
                ${e.publishedAt.slice(0, 10)}
            </p>
          </div>

          <h3 class="font-weight-bold dark-grey-text mb-3"><a href="${e.url}">${e.title}</a></h3>
          <p class="dark-grey-text">${e.description || ''}</p>
          <button onclick="speak(${i})">Speak</button>
          <input type="submit" value="Stop speaking" onclick="stopSpeak();">
        </div>
        </div>
        `
    })
    return html
}

function translateText() {
    $('#translatedText').html('Please wait...')
    let text = $('#textTranslate').val()
    let lang = $('#textTranslateTo').val()
    let postData = `lang=${lang}&text=${text}`
    $.ajax({
        url: `${baseurl}/api/translate`,
        method: 'POST',
        data: postData
    })
        .done(response => {
            let html = `<h6>${response.lang}</h6>`
            html += `<h5>${response.text[0]}</h5>`
            $('#translatedText').html(html)
        })
        .fail(response => {
            $('#translatedText').text(JSON.stringify(response))
            console.log(response)
        })
}

$.ajax({ url: `${baseurl}/api/translate/getLangs` })
    .done(response => {
        for (const iso in response.langs) {
            $('#textTranslateTo').append($("<option />").val(iso).text(response.langs[iso]));
            $('#articlesTranslateTo').append($("<option />").val(iso).text(response.langs[iso]));
        }
        let lang = $('#translateTo').val()
    })
    .fail(response => {
        $('#translatedText').text(JSON.stringify(response))
        console.log(response)
    })

let voices = (responsiveVoice.getVoices())
$.each(voices, function () {
    $('#voice').append($("<option />").val(this.name).text(this.name));
});
let countryText = `ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za`
let countryTextSplit = countryText.split(' ')
$.each(countryTextSplit, function () {
    $('#topHeadlinesCountry').append($("<option />").val(this).text(this));
});
let categoryText = `business entertainment general health science sports technology`
let categoryTextSplit = categoryText.split(' ')
$.each(categoryTextSplit, function () {
    $('#topHeadlinesCategory').append($("<option />").val(this).text(this));
});
let sortByText = `relevancy popularity publishedAt`
let sortByTextSplit = sortByText.split(' ')
$.each(sortByTextSplit, function () {
    $('#everythingSortBy').append($("<option />").val(this).text(this));
});
let languageText = `ar de en es fr he it nl no pt ru se ud zh`
let languageTextSplit = languageText.split(' ')
$.each(languageTextSplit, function () {
    $('#everythingLanguage').append($("<option />").val(this).text(this));
});