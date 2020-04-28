import React, { useState, useRef } from 'react';
import { Container, Form, Button } from 'semantic-ui-react'
import { getItem } from '../Utils/StorageHelper'
import { addQuestion } from '../Utils/Api'
import moment from 'moment-timezone'
import './Css/AddQuestion.css'

function AddQuestion(props) {

    const [error, setError] = useState("")
    const question = useRef()

    const doQuestions = async (event) => {
        event.preventDefault()

        if (!question.current.value) {
            setError("Inserisci la domanda")
            return
        }

        const date = moment().tz('Europe/Rome').format('DD-MM-YYYY HH:mm')
        const respondent = props.username
        const author = getItem('username')

        const response = await addQuestion(question.current.value, author, respondent, date)

        if (response.ok) {
            props.updateQuestion()
            question.current.value = ""
        }
    }

    return (
        <Container>
            <Form className="add-question-form">
                <Form.Field>
                    <h3>Fai una domanda a {props.name} </h3>
                    <label> {error} </label>
                    <input placeholder='Question' ref={question} onFocus={() => setError('')} />
                </Form.Field>
                <Button type='submit' color='youtube' onClick={doQuestions}>Chiedi </Button>
            </Form>
        </Container>
    )
}

export default AddQuestion