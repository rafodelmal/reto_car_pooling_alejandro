const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/liseth', (req, res) => {
    res.send('Hello Liseth!')
})

app.listen(port, () => {
    console.log(`Estoy escuchando por el puerto${port}`)
})