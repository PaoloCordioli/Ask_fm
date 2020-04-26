import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import { Container, Button, Form, Checkbox, Header } from 'semantic-ui-react';
import { getItem } from '../Utils/StorageHelper'
import { getQuestionsUser, updateQuestion } from '../Utils/Api';
import Menu from './Menu'
import Questions from './Questions'
import './Css/Profile.css'

function Profile() {

    const { username } = useParams();

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getQuestionsUser(username).then((res) => setQuestions(res))
    }, [username]);

    const resetState = () => {
        setQuestions([])
    }


    const sign = (getItem('sign') === "true")

    if (!sign) {
        return (
            <Redirect to="/" />
        )
    }

    const doAnswer = async (id, answer) => {

        const response = await updateQuestion(id, answer)

        if (response.ok) {
            getQuestionsUser(username).then((res) => setQuestions(res))
        }

    }

    const name = username.charAt(0).toUpperCase() + username.substring(1)

    if (username === getItem('username')) {
        return (
            <Container>
                <Menu />
                <Container align='center'>
                    <Header as="h2" className="profile-title" color="red"> Benvenuto nel tuo profilo {name}, queste sono le ultime domande che hai ricevuto </Header>
                    <Questions questions={questions} onHome={false} onMyProfile={true} doAnswer={doAnswer} setQuestions={resetState} />
                </Container>
            </Container>
        )
    }


    return (
        <Container>
            <Menu />
            <Container>
                <Container>
                    <Header as="h2" className="profile-title" color="red">Benvenuto nel profilo di {name}, queste sono le ultime domande che ha ricevuto </Header>
                    <Form className="profile-form">
                        <Form.Field>
                            <h3>Fai una domanda a {name} </h3>
                            <input placeholder='Question' />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='In forma anonima' />
                        </Form.Field>
                        <Button type='submit' color='youtube'>Chiedi </Button>
                    </Form>
                </Container>
            </Container>
            <Container align='center'>
                <Questions questions={questions} onHome={false} onMyProfile={false} setQuestions={resetState} />
            </Container>
        </Container>
    )
}

export default Profile