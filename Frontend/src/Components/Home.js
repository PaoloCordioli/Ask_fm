import React from 'react';
import { Button, Image, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getItem } from '../Utils/StorageHelper'
import Dashboard from './Dashboard'
import img from '../Images/ask.png'
import './Css/Home.css'

function Home() {

    const sign = (getItem('sign') === "true")

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
                        <Button size="medium" color="violet" as={Link} to="/signUp" > Registrati </Button> <br></br>
                        <Button size="medium" color="youtube" as={Link} to="/signIn"> Accedi </Button>
                    </Button.Group>
                </div>
            </div>
        </Container>
    )
}

export default Home