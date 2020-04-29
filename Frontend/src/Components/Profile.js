import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import { Container, Header, Pagination } from 'semantic-ui-react';
import { getItem } from '../Utils/StorageHelper'
import { getQuestionsUser, updateQuestion } from '../Utils/Api';
import Menu from './Menu'
import Questions from './Questions'
import AddQuestion from './AddQuestion'
import './Css/Profile.css'

function Profile() {

    const { username } = useParams();

    const [questions, setQuestions] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [activeQuestions, setActiveQuestions] = useState([])

    useEffect(() => {
        getQuestionsUser(username)
            .then((res) => {
                setQuestions(res)

                const length = activePage * 4 - 4 
                const quest = res.slice(length, length + 4)
                setActiveQuestions(quest)
            })
    }, [username, activePage]);

    const onPageChange = (event, { activePage }) => {
        setActivePage(activePage)
    }

    const resetState = () => {
        setActiveQuestions([])
    }

    const updateQuestions = () => {
        getQuestionsUser(username).then((res) => setQuestions(res))
    }

    const doAnswer = async (id, answer) => {

        const response = await updateQuestion(id, answer)

        if (response.ok) {
            updateQuestions()
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
                    <Questions questions={activeQuestions} onHome={false} onMyProfile={true} doAnswer={doAnswer} setQuestions={resetState} />
                    <Pagination
                        defaultActivePage={activePage}
                        firstItem={null}
                        lastItem={null}
                        pointing
                        secondary
                        totalPages={Math.ceil(questions.length / 4)}
                        onPageChange={onPageChange}
                    />
                </Container>
            </Container>
        )
    }


    return (
        <Container>
            <Menu />
            <Container>
                <Header as="h2" className="profile-title" color="red">Benvenuto nel profilo di {name}, queste sono le ultime domande che ha ricevuto </Header>
                <AddQuestion updateQuestion={updateQuestions} name={name} username={username} />
            </Container>
            <Container align='center'>
                <Questions questions={activeQuestions} onHome={false} onMyProfile={false} setQuestions={resetState} />
                <Pagination
                    defaultActivePage={activePage}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    totalPages={Math.ceil(questions.length / 3)}
                    onPageChange={onPageChange}
                />
            </Container>
        </Container>
    )
}

export default Profile