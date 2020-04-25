import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Css/Questions.css'

function Questions(props) {

    const getPath = (username) => {
        return `/ask/${username}`
    }

    const createCard = (e) => {

        const author = e.author.charAt(0).toUpperCase() + e.author.substring(1)
        const username = e.username.charAt(0).toUpperCase() + e.username.substring(1)

        if (props.onMyProfile) {
            if (e.answer === '') {
                return <Card key={e._id} >
                    <Card.Content>
                        <Card.Header>
                            Da
                        <Link to={getPath(e.author)} className="questions-author" > <strong> <em> {author} </em> </strong> </Link>
                        Per
                        <Link to={getPath(e.username)} className="questions-username"> <strong> <em> {username} </em> </strong> </Link> :
                    </Card.Header>
                    <Card.Description>
                            <strong><em> Domanda </em></strong> : {e.question}
                            <br></br>
                            <button>Rispondi</button>
                        </Card.Description>
                    </Card.Content>
                </Card >
            }
        }

        if (e.answer === '') {
            return <Card key={e._id} >
                <Card.Content>
                    <Card.Header>
                        Da  
                        <Link to={getPath(e.author)} className="questions-author" > <strong> <em> {author} </em> </strong> </Link>
                        Per  
                        <Link to={getPath(e.username)} className="questions-username" > <strong> <em> {username} </em> </strong> </Link> :
                    </Card.Header>
                    <Card.Description>
                        <strong><em> Domanda </em></strong> : {e.question}
                    </Card.Description>
                </Card.Content>
            </Card >
        }

        return <Card key={e._id} >
            <Card.Content>
                <Card.Header>
                    Da
                    <Link to={getPath(e.author)} className="questions-author" > <strong> <em> {author} </em> </strong> </Link>
                    Per
                    <Link to={getPath(e.username)} className="questions-username" > <strong> <em> {username} </em> </strong> </Link> :
                </Card.Header>
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