import React from 'react';
import { Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import img from '../Images/ask.png'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <div className="button">
                <Image src={img} centered />
                <div className="text"> Curioso? <b>Allora chiedi! <br></br> Apertamente o in modo anonimo. </b> </div> <br></br>
                <Button.Group vertical >
                    <Button className="button" size="medium" color="violet" as={Link} to="/signUp" > Sign Up </Button> <br></br>
                    <Button className="button" size="medium" color="youtube" as={Link} to="/signIn"> Login </Button>
                </Button.Group>
            </div>
        </div>
    )
}

export default Home