const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
const cors = requeire('cors') //aqui estou trazendo o pacote cors que permite consumir essa api no front-end


const conectaBancoDeDados = require('./bancoDeDados') //aqui esgou ligando ao arquivo banco de dados 
conectaBancoDeDados() //aqui estou chamando a função que conectado o banco de dados
const Mulher = require('./mulher.Model')
const app = express() //aqui estou iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333 //aqui estou criando a porta


//GET
async function mostraMulheres(request, response) {
     try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        
        response.json(mulheresVindasDoBancoDeDados)

     }catch (erro) {
        console.log(erro)

     }
    
}

//post 
async function criaMulher(request, response){
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citação: request.body.citação

    })

    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response){
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if(request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada = request.body.imagem
        }

        if (request.body.citação) {
            mulherEncontrada = request.body.citação
        }
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }
   
    }

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({message: 'Mulher deletada com sucesso!'})
    }catch(erro){
        console.log(erro)
    }
}

app.use(router.get('/mulheres', mostraMulheres)) //configurei rota GET/mulheres 
app.use(router.post('/mulheres', criaMulher)) //configurei rota POST//mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei a rota DELETE/mulheres

//PORTA
function mostraPorta() {
   console.log("servidor criado e rondando na porta", porta)
}

app.listen(porta, mostraPorta) //Servidor ouvindo a porta 