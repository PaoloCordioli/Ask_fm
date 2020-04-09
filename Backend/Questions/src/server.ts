import express from "express";
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { MongoDB } from './utils/mongoDB'
import { authentication } from './utils/api'

const server = express();
server.use(cors())
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))


server.get('/', async (req, res) => {
    res.status(200).send({
        ok: true,
        data: {
            message: "Benvenuto nel mio server"
        }
    })
})

server.get('/questions', async (req, res) => { // ritorno tutte le domande
    const token = req.headers['x-access-token']
    const authenticated = await authentication(token)

    if (!authenticated) {
        res.status(404).send({
            ok: false,
            data: {
                err: "Token error"
            }
        })
        return
    }

    const database = await MongoDB.get_instance()
    const result = await database.get()

    res.status(200).send({
        ok: true,
        data: {
            result
        }
    })
})

server.get('/questions/:username', async (req, res) => { // ritorno tutte le domande di un utente
    const token = req.headers['x-access-token']
    const authenticated = await authentication(token)

    if (!authenticated) {
        res.status(404).send({
            ok: false,
            data: {
                err: "Token error"
            }
        })
        return
    }

    const { username } = req.params

    const database = await MongoDB.get_instance()
    const questions = await database.get_questions_by_username(username)

    res.status(200).send({
        ok: true,
        data: {
            questions
        }
    })
})

server.post('/questions', async (req, res) => { //crea una domanda
    const token = req.headers['x-access-token']
    const authenticated = await authentication(token)

    if (!authenticated) {
        res.status(404).send({
            ok: false,
            data: {
                err: "Token error"
            }
        })
        return
    }

    const database = await MongoDB.get_instance()
    const { question } = req.body
    database.add_question(question)

    res.status(200).send({
        ok: true,
        data: {}
    })
});

/*server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});*/

module.exports = server
