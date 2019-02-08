# news-app

To run this the server, make sure you have ```node``` and ```npm``` then run
```
npm install
cd ./server
node app.js
```

To run the client you can use live-server on the client directory

# API references
Make sure to include your token key in the header of your http request.

## News API
### Getting top headlines  
```GET /api/news/top-headlines```  

Example : 
```http://localhost:3000/api/news/top-headlines?q=something&country=us&category=health```  

Request parameters :  
```q```:  
Keywords or a phrase to search for.  
```country```:  
The 2-letter ISO 3166-1 code of the country you want to get headlines for. Possible options: ```ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za``` . Note: you can't mix this param with the sources param.  
```category```:  
The category you want to get headlines for. Possible options: ```business entertainment general health science sports technology``` . Note: you can't mix this param with the sources param.  

### Getting everything  
```GET /api/news/everything```  

Example :  
```http://localhost:3000/api/news/everything?q=something&language=en&sortBy=popularity```  

Request parameters :  
```q```  
Keywords or phrases to search for.  
```from```
A date and optional time for the oldest article allowed. This should be in ISO 8601 format (e.g. ```2019-02-08``` or ```2019-02-08T09:15:07```).  
```to```  
A date and optional time for the newest article allowed. This should be in ISO 8601 format (e.g. ```2019-02-08``` or ```2019-02-08T09:15:07```).  
```language```  
The 2-letter ISO-639-1 code of the language you want to get headlines for. Possible options: ```ar de en es fr he it nl no pt ru se ud zh``` . Default: all languages returned.  
```sortBy```  
The order to sort the articles in. Possible options: ```relevancy, popularity, publishedAt```. Default: publishedAt  

## Translation API
### Translate a text
```POST /api/translate/newsapiData```

header :  
```Content-Type: application/x-www-form-urlencoded```

Request body :  
```text``` 
The text to translate.  
```lang```  	
The target translation language.

