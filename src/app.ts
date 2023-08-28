const express = require('express');
const app: Applicatin = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app;