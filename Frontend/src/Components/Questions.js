import React, { useRef, useState } from 'react'
import { Card, Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Css/Questions.css'

function Questions(props) {

    const answer = useRef()
    const [errorAnswer, setErrorAnswer] = useState("")

    const getPath = (username) => {
        return `/ask/${username}`
    }

    const doAnswer = (event, id) => {
        event.preventDefault()

        if (answer.current.value === "") {
            setErrorAnswer('Inserisci la risposta')
            return
        }

        props.doAnswer(id, answer.current.value)
        setErrorAnswer('')
    }

    const removeError = () => {
        setErrorAnswer('')
    }

    const createCard = (e) => {

        const author = e.author.charAt(0).toUpperCase() + e.author.substring(1)
        const username = e.username.charAt(0).toUpperCase() + e.username.substring(1)

        if (props.onHome) {
            if (e.answer === '') {
                return <Card key={e._id} >
                    <Card.Content>
                        <Card.Header>
                            <Link to={getPath(e.author)} className="questions-author" > <strong> <em> {author} </em> </strong> </Link>
                            &nbsp; chiede a &nbsp;
                        <Link to={getPath(e.username)} className="questions-username" > <strong> <em> {username} </em> </strong> </Link> :
                    </Card.Header>
                        <Card.Meta>
                            <span className='date'> - {e.date} - </span>
                        </Card.Meta>
                        <Card.Description>
                            <strong><em> Domanda </em></strong> : {e.question}
                        </Card.Description>
                    </Card.Content>
                </Card >
            }

            return <Card key={e._id} >
                <Card.Content>
                    <Card.Header>
                        <Link to={getPath(e.author)} className="questions-author" > <strong> <em> {author} </em> </strong> </Link>
                        &nbsp; chiede a &nbsp;
                    <Link to={getPath(e.username)} className="questions-username" > <strong> <em> {username} </em> </strong> </Link> :
                </Card.Header>
                    <Card.Meta>
                        <span className='date'> - {e.date} - </span>
                    </Card.Meta>
                    <Card.Description>
                        <strong><em> Domanda </em></strong> : {e.question}
                        <br></br>
                        <strong><em> Risposta </em></strong>: {e.answer}
                    </Card.Description>
                </Card.Content>
            </Card >

        }

        if (props.onMyProfile) {
            if (e.answer === '') {
                return <Card key={e._id} >
                    <Card.Content>
                        <Card.Header>
                            <Link to={getPath(e.author)} className="questions-author" > <strong> <em> {author} </em> </strong> </Link>
                            &nbsp; chiede :
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'> - {e.date} - </span>
                        </Card.Meta>
                        <Card.Description>
                            <p> <strong><em> Domanda </em></strong> : {e.question} </p>
                            <Form>
                                <Form.Field>
                                    <label> Rispondi : </label>
                                    <input placeholder='Risposta' ref={answer} onFocus={removeError} />
                                    <label>{errorAnswer}</label>
                                </Form.Field>
                                <Button type='submit' color='youtube' onClick={(event) => { doAnswer(event, e._id) }} > Rispondi </Button>
                            </Form>
                        </Card.Description>
                    </Card.Content>
                </Card >
            }
        }

        if (e.answer === '') {
            return <Card key={e._id} >
                <Card.Content>
                    <Card.Header>
                        <Link to={getPath(e.author)} className="questions-author" > <strong> <em> {author} </em> </strong> </Link>
                        &nbsp; chiede :
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'> - {e.date} - </span>
                    </Card.Meta>
                    <Card.Description>
                        <strong><em> Domanda </em></strong> : {e.question}
                    </Card.Description>
                </Card.Content>
            </Card >
        }

        return <Card key={e._id} >
            <Card.Content>
                <Card.Header>
                    <Link to={getPath(e.author)} className="questions-author" > <strong> <em> {author} </em> </strong> </Link>
                    &nbsp; chiede :
                </Card.Header>
                <Card.Meta>
                    <span className='date'> - {e.date} - </span>
                </Card.Meta>
                <Card.Description>
                    <strong><em> Domanda </em></strong> : {e.question}
                    <br></br>
                    <strong><em> Risposta </em></strong>: {e.answer}
                </Card.Description>
            </Card.Content>
        </Card >
    }

    let questions = props.questions.map(createCard)

    return (
        <>
            {questions}
        </>
    )

}

export default Questions