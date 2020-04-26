import React, { useEffect, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'
import { getItem } from '../Utils/StorageHelper';
import { getAllQuestions, checkToken } from '../Utils/Api'
import Menu from './Menu'
import Questions from './Questions'

function Dashboard() {

    const [questions, setQuestions] = useState([])

    const sign = (getItem('sign') === "true")

    useEffect(() => {
        if (!sign)
            return

        checkToken().then(() => getAllQuestions()).then((res) => setQuestions(res))

    }, []);

    if (!sign) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Container>
            <Menu />
            <Container align='center'>
                <Header as="h1" color="red" > Benvenuto in Ask.fm, vedi gli ultimi messaggi </Header>
                <Questions questions={questions} onHome={true} />
            </Container>
        </Container>
    )
}

export default Dashboard