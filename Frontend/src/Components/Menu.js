import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'

function MenuBar() {

    const history = useHistory()

    const logout = () => {
        localStorage.setItem('sign', false)
        localStorage.setItem('token',"")
        localStorage.setItem('username', "")

        history.push('/signIn')
    }

    return (
        <div>
            <Menu secondary>
                <Menu.Item as={Link} to="/" name='home'/>
                <Menu.Menu position='right'>
                    <Menu.Item onClick={logout} name='logout'/>
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default MenuBar