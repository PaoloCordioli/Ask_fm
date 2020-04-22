import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { setItem, getItem } from '../Utils/StorageHelper'
import Logo from '../Images/title.png'

function MenuBar() {

    const history = useHistory()

    const logout = () => {
        setItem('sign', false)
        setItem('token', "")
        setItem('username', "")
        setItem('password', "")

        history.push('/signIn')
    }

    const getPath = () => {
        return `/ask/${getItem('username')}`
    }

    return (
        <Menu secondary>
            <Menu.Item>
                <img src={Logo} alt="Logo" />
            </Menu.Item>
            <Menu.Item as={Link} to="/" name='Home' />
            <Menu.Item as={Link} to={getPath} name='Il mio Profilo' />
            <Menu.Menu position='right'>
                <Menu.Item onClick={logout} name='Esci' />
            </Menu.Menu>
        </Menu>
    )
}

export default MenuBar