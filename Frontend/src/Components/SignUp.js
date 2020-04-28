import React, { useState, useRef } from 'react';
import { Container, Form, Button, Image } from 'semantic-ui-react';
import { Link, useHistory, Redirect } from 'react-router-dom'
import { getItem } from '../Utils/StorageHelper'
import img from '../Images/title.png'
import { checkRegistration } from '../Utils/Api';
import './Css/SignUp.css'

function SignUp() {

    const [error, setError] = useState("")
    
    const username = useRef("")
    const password = useRef("")
    const rePassword = useRef("")

    const history = useHistory()

    const signUp = async (event) => {
        event.preventDefault()

        if (!username.current.value  || !password.current.value || !rePassword.current.value ) {
            setError("Inserisci tutti i campi!")
            return
        }
        if (password.current.value !== rePassword.current.value) {
            setError("Password non uguali!")
            return
        }

        const result = await checkRegistration(username.current.value, password.current.value)

        if (result.ok === false) {
            setError("Username esistente, prova a cambiarlo!")
            return
        }

        history.push('/signIn')
    }

    const removeError =  () => {
        setError('')
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
                                <input placeholder='Username' ref={username} onFocus={removeError} />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input placeholder='Password' type="password" ref={password} onFocus={removeError} />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input placeholder='Password' type="password" ref={rePassword} onFocus={removeError} />
                            </Form.Field>
                            <Button type='submit' color="youtube" onClick={signUp}> Registrati </Button>
                        </Form>
                    </Container>
                </div>
            </div>
        </Container>
    )
}

export default SignUp