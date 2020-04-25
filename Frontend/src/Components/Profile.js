import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import { getItem } from '../Utils/StorageHelper'
import { getQuestionsUser } from '../Utils/Api';
import Menu from './Menu'
import Questions from './Questions'

function Profile() {

    const { username } = useParams();

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getQuestionsUser(username).then((res) => setQuestions(res))
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