import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { setItem } from '../Utils/StorageHelper'

function MenuBar() {

    const history = useHistory()

    const logout = () => {
        setItem('sign', false)
        setItem('token',"")
        setItem('username', "")
        setItem('password', "")

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