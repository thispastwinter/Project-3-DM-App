import React from "react";
import { NavLink } from "react-router-dom";
import { Tabs } from 'react-bulma-components';


function NavTabs(props) {

    return (
        <Tabs type='toggle' fullwidth={true}>
            <Tabs.Tab renderAs="div">
                <NavLink to={{
                    pathname: '/initadmin',
                    state: { game_id: props.game_id }
                }} activeClassName="is-active">
                    Initiative
                 </NavLink>
            </Tabs.Tab>
            <Tabs.Tab renderAs="div">
                <NavLink to={{
                    pathname: '/hue',
                    state: { game_id: props.game_id }
                }} activeClassName="is-active">
                    Philips Hue
                </NavLink>
            </Tabs.Tab>
        </Tabs >
    );
}

export default NavTabs;
