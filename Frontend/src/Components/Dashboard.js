import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'
import { getItem } from '../Utils/StorageHelper';
import { getAllQuestions, refreshToken } from '../Utils/Api'
import Menu from './Menu'
import Questions from './Questions'

function Dashboard() {

    const [questions, setQuestions] = useState([])

    const sign = (getItem('sign') === "true")

    useEffect(() => {
        if (!sign)
            return

        refreshToken().then(() => getAllQuestions()).then((res) => setQuestions(res))

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
                <Questions questions={questions} />
            </Container>
        </Container>
    )
}

export default Dashboard