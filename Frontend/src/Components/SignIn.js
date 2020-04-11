import React from 'react';
import { Container, Form, Button, Image } from 'semantic-ui-react';
import img from '../Images/title.png'
import './SignIn.css'

function SignIn() {
    return (
        <div className="background">
            <div className="title">
                <Image src={img} centered />
            </div>
            <Container className="form">
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' type="password" />
                    </Form.Field>
                    <Button type='submit' color="youtube">Sign In</Button>
                </Form>
            </Container>
        </div>
    )
}

export default SignIn