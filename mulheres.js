const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome:'Simara Conceição',
        imagem:'https://github.com/simaraconceicao.png',
        minibio:'Desenvolvedora e Instrutora'
    },
    {
        nome: 'Iana Chan',
        imagem: '',
        minibio: 'Fundadora da PrograMaria'
    },
    {
        nome: 'Nina da Hora',
        imagem:'',
        minibio: 'Hacker antirracista'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
   console.log("servidor criado e rondando na porta", porta)
}
app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)