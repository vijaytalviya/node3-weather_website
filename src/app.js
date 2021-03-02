
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')


//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'vijay'
    })
})


app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About Me',
        name:'vijay'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title: 'Help',
        name:"vijay"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'provide some address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
        return res.send({
            error: error  
         }) 
        }
        
        forecast(latitude, longitude, (error, {descriptions,
            temperature,
            windSpeed,
            pressure,
            humidity,feelslike}={}) => {
            if(error){
                return res.send({
                    'Error': error
                })
            }
            res.send({
                
                descriptions,
                temperature,
                windSpeed,
                pressure,
                humidity,
                location,
                feelslike
            })
            
        })
    
    })


   
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'yoy must provide a search'
        })
    }
       console.log(req.query.search) 
        res.send({
            products:[]
        })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'vijay',
        errorMessage:'Help artical not found'})

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'vijay',
        errorMessage:'page not found'
    })

})
//app.com
// app.com/help
// app.com/about

app.listen(port, ()=>{
    console.log('server is up on port '+port)
})