const express = require('express')
const app = express()
const PORT = 3000
const cors = require("cors")

const loginRouter = require('./routes/loginRoute')

app.use(cors)
app.use(loginRouter) 
//usar o use pq ele vai ser utilizado p todas as requisicoes independente se eh post get etc

app.get('/', (req, res) =>{
    res.send('<h1>ola mundo</h1>')
})

app.get("/sobre", (req, res) => {
    res.send("<h1>esta funcionando</h1>")
})

app.listen(PORT, () =>{

    console.log(`app funcionando na porta ${PORT}`)
})