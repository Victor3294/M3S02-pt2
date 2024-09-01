const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: "API Questionarios Simplificados",
        description: "Documentação da API Questionarios Simplificados usando express e sequelize",
        version: "1.0.0"
    },
    host: "localhost:3333",
    security: [{"apiKeyAuth": []}],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Bearer <token>"
        }
    }
}

const outputFile = './src/doc.swagger.json'
const routes = ['./src/server.js']

swaggerAutogen(outputFile, routes, doc)