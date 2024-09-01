require('dotenv').config()

const database = require('./database/config')
const express = require('express')


const usuarioRouter = require('./dominios/usuarios')
const questionariosRouter = require('./dominios/questionarios')
const sessionsRouter = require('./dominios/sessions')
const respostasRouter = require('./dominios/respostas')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./doc.swagger.json')
const { garantirAutenticacao, garantirAutenticacaoRBAC } = require('./middlewares/garantirAutenticacao')

const app = express()
/** Config */
app.use(express.json()) // middleware => interceptador

/** DEFINIÇÃO DE ROTAS */

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/usuarios', usuarioRouter)
app.use('/sessions', sessionsRouter)
app.use('/questionarios',garantirAutenticacao, garantirAutenticacaoRBAC('criador') ,  questionariosRouter)
app.use('/respostas', garantirAutenticacao, garantirAutenticacaoRBAC('estudante'), respostasRouter)

async function iniciarServidor() {

    await database.authenticate()
    console.log("Banco de dados foi incializado com sucesso!")

    app.listen(3333, () => {

        console.log("Servidor rodando na porta 3333")
    })
}

iniciarServidor()