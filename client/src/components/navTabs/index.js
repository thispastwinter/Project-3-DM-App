import React from "react";
import { NavLink } from "react-router-dom";
import { Tabs } from 'react-bulma-components';


function NavTabs(props) {

    return (
        <Tabs type='toggle' fullwidth={true}>
            <Tabs.Tab renderAs="div">
                <NavLink exact to="/init" activeClassName="is-active">
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
