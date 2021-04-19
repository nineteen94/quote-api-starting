const e = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Return Random Quote @ GET /api/quotes/random' 

app.get('/api/quotes/random', (req, res, next) => {
    const quoteToSend = getRandomElement(quotes);
    const objectToSend = {};
    objectToSend.quote = quoteToSend;
    res.send(objectToSend);
});

// Return all the Quotes @ GET /api/quotes if there are no query parameters
app.get('/api/quotes', (req, res, next) => {
    let int = 0;
    const objectToSend = {};
    for(var prop in req.query) {
        int ++;
    }
    if(int === 0) {
        objectToSend.quotes = quotes;
        res.send(objectToSend);
    }
    else {
        let arrayToSend;
        console.log('Checking Here Point 1');
        if(req.query.hasOwnProperty('person')) {
            const person = req.query.person;
            console.log("PERSON >>>>>>" + person);
            
            arrayToSend = quotes.filter(element => element['person'] === person);
             
    }
        objectToSend.quotes = arrayToSend;
        console.log("<<<<<<<<<>" + arrayToSend);
        res.send(objectToSend); 
    }

})


// Adding new quotes @ POST /api/quotes ; new quotes should be passed as query strings with 
// 2 properties - quote and person. Verify and send 400 response if they do not exist
// If it works, send back the quote object { quote: {quote object}}
app.post('/api/quotes', (req, res, next) => {
    const iData = req.query;
    console.log(iData);
    if(iData.hasOwnProperty('quote') && iData.hasOwnProperty('person')) {
        const person = iData.person;
        const quote = iData.quote;
        quotes.push({quote: quote, person: person});
        res.status(201).send({quote: {quote: quote, person: person}});
    } else {
        res.status(404).send('Error !!!! Send Correct DATA !!');
    }
});

app.listen(PORT);