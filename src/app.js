const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000

//path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialPath = path.join(__dirname, '/templates/partials')

//setting path for handlebars   
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup for static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me'
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.location 
    if (!address) {
        res.send({
            error: 'please provide a location'
        })
    }else{
        // console.log(address)
        geocode(address, (error,response) => {
            if (error) {
                res.send({
                    error: error
                })
            }else{
                console.log(response.location)
                forecast(response.latitude, response.longitude, (error, data) => {
                    if (error) {
                        res.send({
                            error: error
                        })
                    }else{
                        // console.log(chalk.green.bold('success!'),'temp: '+ data.main.temp)
                        res.send({
                            location: response.location,
                            data
                        })
                    }
                })
            }
        })            
        // })    
    }
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title:'404',
        message:'Help article not found!'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        message:'Page not found!'
    })
})

app.listen(port, () => {
    console.log(`server is currently active on poort ${port}`)
})