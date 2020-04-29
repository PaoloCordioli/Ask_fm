import React, { useEffect, useState } from 'react';
import { Container, Header, Pagination } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'
import { getItem } from '../Utils/StorageHelper';
import { getAllQuestions, checkToken } from '../Utils/Api'
import Menu from './Menu'
import Questions from './Questions'

function Dashboard() {

    const [questions, setQuestions] = useState([])

    const [activePage, setActivePage] = useState(1)
    const [activeQuestions, setActiveQuestions] = useState([])

    const sign = (getItem('sign') === "true")

    useEffect(() => {
        if (!sign)
            return

        checkToken()
            .then(() => getAllQuestions())
            .then((res) => {
                setQuestions(res)

                const length = activePage * 5 - 5
                const quest = res.slice(length, length + 5)
                setActiveQuestions(quest)
            })
    }, [sign, activePage]);

    const onPageChange = (event, { activePage }) => {
        setActivePage(activePage)
    }

    if (!sign) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Container>
            <Menu />
            <Container align='center'>
                <Header as="h1" color="red" > Benvenuto in Ask.fm, ecco le ultime domande </Header>
                <Questions questions={activeQuestions} onHome={true} />
                <Pagination
                    defaultActivePage={activePage}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    totalPages={ Math.ceil(questions.length / 5) }
                    onPageChange={onPageChange}
                />
            </Container>
        </Container>
    )
}

export default Dashboard