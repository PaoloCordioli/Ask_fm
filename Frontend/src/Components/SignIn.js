import React, { useState, useRef } from 'react';
import { Container, Form, Button, Image } from 'semantic-ui-react';
import { Link, useHistory, Redirect } from 'react-router-dom'
import { getItem, setItem } from '../Utils/StorageHelper'
import img from '../Images/title.png'
import './Css/SignIn.css'

function SignIn() {

    const [error, setError] = useState("")

    const username = useRef("")
    const password = useRef("")

    const history = useHistory()

    const signIn = async (event) => {
        event.preventDefault()

        if (username.current.value === "" || password.current.value === "") {
            setError("Inserisci tutti i campi!")
            return
        }

        const response = await fetch(`https://ask-auth.now.sh/users/${username.current.value}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password.current.value })
        }).then((res) => res.json())

        if (response.ok === true) {
            setItem('sign', true)
            setItem('token', response.data.token)
            setItem('username', username.current.value)
            setItem('password', password.current.value)

            history.push('/')
        }
        else setError("Password o username errati!")
    }


    const sign = (getItem('sign') === "true")

    if (sign) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Container className="signIn-container">
            <div className="signIn-app">
                <div className="signIn-content">
                    <Image src={img} centered />
                    <Container className="signIn-form">
                        <h1>Accedi</h1>
                        <p className="signIn-text"> Non hai ancora un account?
                            <Link to="/signUp" className="signIn-link" > Registrati</Link> </p>
                        <h3>{error}</h3>
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
            </div>
        </Container>
    )
}

export default SignIn