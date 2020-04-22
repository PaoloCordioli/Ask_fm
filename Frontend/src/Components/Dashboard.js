import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'
import { getItem } from '../Utils/StorageHelper';
import Menu from './Menu'
import Questions from '../Components/Questions'

function Dashboard() {

    const [questions, setQuestions] = useState([])

    useEffect(() => {

        fetch('https://ask-question.now.sh/questions', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': getItem('token')
            },
        }).then((res) => res.json())
            .then((res) => setQuestions(res.data.questions))

    }, []);


    const sign = (getItem('sign') === "true")

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