import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react';
import { getItem } from '../Utils/StorageHelper'
import { getQuestionsUser } from '../Utils/Api';
import Menu from './Menu'
import Questions from './Questions'
import AddQuestion from './AddQuestion'
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

    const updateQuestion = () => {
        getQuestionsUser(username).then((res) => setQuestions(res))
    }

    const doAnswer = async (id, answer) => {

        const response = await updateQuestion(id, answer)

        if (response.ok) {
            getQuestionsUser(username).then((res) => setQuestions(res))
        }

    }

    const sign = (getItem('sign') === "true")

    if (!sign) {
        return (
            <Redirect to="/" />
        )
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
                <Header as="h2" className="profile-title" color="red">Benvenuto nel profilo di {name}, queste sono le ultime domande che ha ricevuto </Header>
                <AddQuestion updateQuestion={updateQuestion} name={name} username={username} />
            </Container>
            <Container align='center'>
                <Questions questions={questions} onHome={false} onMyProfile={false} setQuestions={resetState} />
            </Container>
        </Container>
    )
}

export default Profile