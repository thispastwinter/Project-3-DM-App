import React from "react";
import { NavLink } from "react-router-dom";
import { Tabs } from 'react-bulma-components';


function NavTabs(props) {
    // let classString = props.isActive ? 'is-active' : '';

    return (
        <Tabs type='toggle' fullwidth={true}>
            <Tabs.Tab renderAs="div">
                <NavLink exact to="/" activeClassName="is-active">
                    Initiative
                 </NavLink>
            </Tabs.Tab>
            <Tabs.Tab renderAs="div">
                <NavLink exact to="/hue" activeClassName="is-active">
                    Philips Hue
                </NavLink>
            </Tabs.Tab>
        </Tabs >
    );
}

export default NavTabs;
