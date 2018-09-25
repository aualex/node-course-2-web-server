const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express(); 
hbs.registerPartials(__dirname + '/views/partials');
app.set ('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});
/* app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance page'
    });
    
}); */
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()+1;
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express...</h1>'); //send pain text
 /*    res.send({              //send Json format data
        name: 'alex',
        sex: 'm',
        likes: [
            'biking',
            'swimming'
        ]
    }); */
    res.render('home.hbs', {
        pageTitle: 'Welcome page',
        // currentYear: new Date().getFullYear(),
        welcomeMsg: "welcome to Alex's website",
        authorName: 'Alex'
    });
}); 

app.get('/about', (req, res) => {
    // res.send('about page here...');
    res.render('about.hbs', {
        pageTitle: 'About page',
        // currentYear: new Date().getFullYear(),
        authorName: 'Alex'
    });
});
app.get('/project', (req, res) => {
    // res.send('about page here...');
    res.render('project.hbs', {
        pageTitle: 'Project page',
        // currentYear: new Date().getFullYear(),
        authorName: 'Alex'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorCode: 404,
        errorText: 'this request cannot be found ! '
    } );
});
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
});
