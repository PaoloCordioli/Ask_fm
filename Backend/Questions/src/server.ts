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
        res.status(401).send({
            ok: false,
            data: {
                err: "Unauthorized"
            }
        })
        return
    }

    const database = await MongoDB.get_instance()
    const questions = await database.get()

    res.status(200).send({
        ok: true,
        data: {
            questions
        }
    })
})

server.get('/questions/:username', async (req, res) => { // ritorno tutte le domande di un utente
    const token = req.headers['x-access-token']
    const authenticated = await authentication(token)

    if (!authenticated) {
        res.status(401).send({
            ok: false,
            data: {
                err: "Unauthorized"
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
        res.status(401).send({
            ok: false,
            data: {
                err: "Unauthorized"
            }
        })
        return
    }

    const { question } = req.body
    const database = await MongoDB.get_instance()
    database.add_question(question)

    res.status(200).send({
        ok: true,
        data: {}
    })
});

server.put('/question', async (req, res) => { // aggiunge la risposta ad una domanda
    const token = req.headers['x-access-token']
    const authenticated = await authentication(token)

    if (!authenticated) {
        res.status(401).send({
            ok: false,
            data: {
                err: "Unauthorized"
            }
        })
        return
    }

    const {username, author, question, answer} = req.body

    const database = await MongoDB.get_instance()
    database.update(username, author, question, answer)

    res.status(200).send({
        ok: true,
        data: {}
    })
})

module.exports = server
