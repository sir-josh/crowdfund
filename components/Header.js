import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';


export default () => {
    
    return(
        <Menu size="massive" style={{ borderRadius: 0, backgroundColor: '#282c34', color: "white", padding: "10px 30px 10px 80px"}}>
            <Menu.Item style={{color: 'white'}}>
                CROWDFUND
            </Menu.Item>
            <Menu.Menu position="right" >
                <Menu.Item style={{color: 'white'}}>
                    Projects
                </Menu.Item>
                <Menu.Item style={{color: 'white'}}>
                    <Icon name='add' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}