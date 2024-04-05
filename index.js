const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()
const PORT = process.env.PORT || 4000;

const app = express();

app.use(require('cors')({
    origin: '*'
}))
app.use(express.json())

const userRoute = require('./routes/user')
const gameRoute = require('./routes/game')


app.use('/user/', userRoute)
app.use('/game/', gameRoute)

app.use(express.static('./client/dist'))

try{

    mongoose.connect(process.env.MONGO_URI)
    
    app.listen(PORT, () => {
        console.log('app is running on port', PORT)
    })
}catch(err){
    console.log('err ', err.message)
}
