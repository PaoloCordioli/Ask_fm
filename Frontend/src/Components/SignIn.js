import React, { useState, useRef } from 'react';
import { Container, Form, Button, Image } from 'semantic-ui-react';
import img from '../Images/title.png'
import './SignIn.css'

function SignIn() {

    const [error, setError] = useState("")

    const username = useRef("")
    const password = useRef("")

    const signIn = async (event) => {
        event.preventDefault()

        if (username.current.value === "" || password.current.value === "") {
            setError("Inserisci tutti i campi!")
            return
        }

        let response = await fetch(`https://ask-auth.now.sh/users/${username.current.value}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password.current.value })
        }).then((res) => res.json())

        console.log(response)

        /*if (response.ok === true) {
            console.log("loggato")
        }
        else setError("Password o username errati!")*/
    }

    return (
        <div className="background">
            <div className="title">
                <Image src={img} centered />
            </div>
            <Container className="form">
                <h3 className="error">{error}</h3>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username' ref={username} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' type="password" ref={password} />
                    </Form.Field>
                    <Button type='submit' color="youtube" onClick={signIn}>Sign In</Button>
                </Form>
            </Container>
        </div>
    )
}

export default SignIn