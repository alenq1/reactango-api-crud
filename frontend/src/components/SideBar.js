import React from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
// Be sure to include styles at some point, probably during your bootstraping



const SideBar = (props) => {
    return (
        <SideNav
    onSelect={(selected) => {
        // Add your code here
        alert(selected)
    }}
    onToggle={(expanded) => {

    }}    
    style={{
            top: '64px',
            position: 'fixed',
            background: 'black',
            height: '100%',
            minwidth: '0',
            zIndex: '1',
            left: '0',
            backgroundColor: '#111',
            overflowX: 'hidden',
            transition: '0.5s',
            
            
    }}
>           
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="charts">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Charts
            </NavText>
            <NavItem eventKey="charts/linechart">
                <NavText>
                    Line Chart
                </NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
                <NavText>
                    Bar Chart
                </NavText>
            </NavItem>
        </NavItem>
    </SideNav.Nav>
</SideNav>
    )

}
export default SideBar
