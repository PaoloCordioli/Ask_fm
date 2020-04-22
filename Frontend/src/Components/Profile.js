import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import { getItem } from '../Utils/StorageHelper'
import Menu from './Menu'
import Questions from '../Components/Questions'

function Profile() {

    const { username } = useParams();

    const [questions, setQuestions] = useState([])

    useEffect(() => {

        fetch(`https://ask-question.now.sh/questions/${username}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': getItem('token')
            },
        }).then((res) => res.json())
            .then((res) => setQuestions(res.data.questions))

    }, [username]);


    const sign = (getItem('sign') === "true")

    if (!sign) {
        return (
            <Redirect to="/" />
        )
    }

    if (username === getItem('username')) {
        return (
            <Container>
                <Menu />
                <Container align='center'>
                    <Questions questions={questions} onMyProfile={true} />
                </Container>
            </Container>
        )
    }

    return (
        <Container>
            <Menu />
            <Container align='center'>
                <Questions questions={questions} onMyProfile={false} />
            </Container>
        </Container>
    )
}

export default Profile