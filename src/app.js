import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import hbs from 'hbs';
import { error } from 'console';
import {forecast} from './utils/forecast.js'
import {geoCode} from './utils/geocode.js'


const app = express(); // Creates an express application
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirPath = path.join(__dirname ,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
app.use(express.static(publicDirPath));
hbs.registerPartials(partialsPath);

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Mostafa Saad'
    });
});


app.get('/about', (req,res) => {
    res.render('about',{
        title:'About',
        name:'Mostafa Saad'
    });
});


app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        name:'Mostafa Saad'
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.location){
        return res.send({
            error:'Location must be provided!'
        });
    }
    geoCode(req.query.location,(error,{lon,lat,label} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
            forecast(lon,lat,(error,forcastData) => {
                if(error){
                    return res.send({
                        error
                    });
                }
                res.send({
                    location : req.query.location,
                    label,
                    forcast : forcastData
                });

            });
        
    });
   
});

app.get('/help/*', (req,res) => {
    res.render('error',{
        errorMsg : 'Help article not found! ',
        title:'404',
        name:'Mostafa Saad'
    })
});

app.get('*', (req,res) => {
    res.render('error',{
        errorMsg : 'Page not found! ',
        title:'404',
        name:'Mostafa Saad'
    })
});

// make the server listens for that specific port
app.listen(port,()=>{
    console.log('Server Starting!');
});

