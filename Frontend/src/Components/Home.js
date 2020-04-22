import React, { useEffect } from 'react';
import { Button, Image, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getItem, setItem } from '../Utils/StorageHelper'
import Dashboard from '../Components/Dashboard'
import img from '../Images/ask.png'
import './Css/Home.css'

function Home() {

    const sign = (getItem('sign') === "true")

    useEffect(() => {
        if (!sign)
            return

        fetch(`https://ask-auth.now.sh/users/${getItem('username')}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: getItem('password') })
        }).then((res) => res.json())
            .then((res) => setItem('token', res.data.token))
    });

    if (sign) {
        return (
            <div>
                <Dashboard />
            </div>
        )
    }

    return (
        <Container className="home-container">
            <div className="home-app">
                <div className="home-content">
                    <Image src={img} centered className="Image" />
                    <div className="text"> Curioso? <b> Allora chiedi!! </b> </div>
                    <div className="text"> <b> Apertamente o in modo anonimo. </b> </div> <br></br>
                    <Button.Group vertical >
                        <Button size="medium" color="violet" as={Link} to="/signUp" > Sign Up </Button> <br></br>
                        <Button size="medium" color="youtube" as={Link} to="/signIn"> Login </Button>
                    </Button.Group>
                </div>
            </div>
        </Container>
    )
}

export default Home