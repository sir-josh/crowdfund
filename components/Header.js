import React from 'react';
import { Menu, Icon, Header } from 'semantic-ui-react';
import { Link } from '../routes';


const HeaderMenu = () => {
    
    return(
        <Menu size="massive" style={{ borderRadius: 0, backgroundColor: '#282c34', color: "white", padding: "10px 30px 10px 80px"}}>
            <Link route="/">
                <a className="item" style={{color: 'white'}}>CROWDFUND</a>
            </Link>
            <Menu.Menu position="right" >
                <Link route="/">
                    <a className="item" style={{color: 'white'}}>Projects</a>
                </Link>
                <Link route="/crowdfund/new">
                    <a className="item" style={{color: 'white'}}>
                         <Icon name='add' />
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}

export default HeaderMenu;