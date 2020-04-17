import React, { useState, useRef } from 'react';
import { Container, Form, Button, Image } from 'semantic-ui-react';
import { Link, useHistory, Redirect } from 'react-router-dom'
import { getItem } from '../Utils/StorageHelper'
import img from '../Images/title.png'
import './Css/SignUp.css'

function SignUp() {

    const [error, setError] = useState("")
    const username = useRef("")
    const password = useRef("")
    const rePassword = useRef("")

    const history  = useHistory() 

    const signUp = async (event) => {
        event.preventDefault()

        if (username.current.value === "" || password.current.value === "" || rePassword.current.value === "") {
            setError("Inserisci tutti i campi!")
            return
        }
        if (password.current.value !== rePassword.current.value) {
            setError("Password non uguali!")
            return
        }

        const result = await fetch("https://ask-auth.now.sh/users", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username.current.value, password: password.current.value })
        }).then((res) => res.json())

        if (result.ok === false) {
            setError("Username esistente, prova a cambiarlo!")
            return
        }

        history.push('/signIn')
    }


    const sign = (getItem('sign') === "true")

    if (sign) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Container className="signUp-container">
            <div className="signUp-app">
                <div className="signUp-content">
                    <Image src={img} centered />
                    <Container className="signUp-form">
                        <h1>Registrati</h1>
                        <p className="signUp-text"> Hai gia un account?
                            <Link to="/signIn" className="signUp-link" > Accedi </Link> </p>
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
                            <Form.Field>
                                <label>Password</label>
                                <input placeholder='Password' type="password" ref={rePassword} />
                            </Form.Field>

                            <Button type='submit' color="youtube" onClick={signUp}>Sign Up</Button>
                        </Form>
                    </Container>
                </div>
            </div>
        </Container>
    )
}

export default SignUp