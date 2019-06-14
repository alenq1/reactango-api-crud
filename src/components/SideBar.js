import React from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { withRouter } from 'react-router'
import { IoIosSpeedometer, IoMdPricetags, IoMdPin } from 'react-icons/io'

// Be sure to include styles at some point, probably during your bootstraping



const SideBar = (props) => {
    return (
        <SideNav
            onSelect={(selected) => {

        // Add your code here
                props.history.push(`/${selected}`)

            }}
            onToggle={(expanded) => {
                let toggled = true
            }}    
            
            style={{
                top: '64px',
                position: 'fixed',
                background: 'black',
                height: '100%',
                minwidth: '0',
                zIndex: '1',
                left: '0',
                background: 'linear-gradient(to right, #0b8793, #360033)',
                overflowX: 'hidden',
                transition: '0.5s',
            }}
        >           
            <SideNav.Toggle />
            <SideNav.Nav >
                <NavItem eventKey="dashboard">
                    <NavIcon>
                        <IoIosSpeedometer size='2em'/>
                    </NavIcon>
                    <NavText>
                        Dashboard
                    </NavText>
                </NavItem>


                <NavItem eventKey="list">
                    <NavIcon>
                        <IoMdPricetags size='2em'/>
                    </NavIcon>
                    <NavText>
                        Products
                    </NavText>
                
                </NavItem>

                <NavItem eventKey="locations">
                    <NavIcon>
                        <IoMdPin size='2em'/>
                    </NavIcon>
                    <NavText>
                        Locations
                    </NavText>
                </NavItem>

            </SideNav.Nav>
        </SideNav>
    )

}
export default withRouter(SideBar)
