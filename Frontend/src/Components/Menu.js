import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function Menu() {
    return (
        <div>
            <Menu secondary>
                <Menu.Item as={Link} to="/home" name='home'/>
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to="/signin" name='logout'/>
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default Menu