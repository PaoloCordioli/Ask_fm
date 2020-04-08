import express from "express";
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { MongoDB } from './utils/mongoDB'
import { get_id_username } from './utils/api'

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
    const { username } = req.params

    const id_user = await get_id_username(username)

    const database = await MongoDB.get_instance()
    const questions = await database.get_questions_by_username(id_user)

    res.status(200).send({
        ok: true,
        data: {
            questions
        }
    })
})

server.post('/questions', async (req, res) => { //crea una domanda
    const database = await MongoDB.get_instance()

    const { question, username, author } = req.body

    const id_user = await get_id_username(username)
    const id_author = await get_id_username(author)

    const question_object = {
        id_author,
        question,
        id_user
    }

    database.add_question(question_object)

    res.status(200).send({
        ok: true,
        data: {}
    })
});

/*server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});*/

module.exports = server
