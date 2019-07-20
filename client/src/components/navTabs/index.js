import React from "react";
import { Link } from "react-router-dom";
import { Tabs } from 'react-bulma-components';


function NavTabs(props) {
    let classString = props.isActive ? 'is-active' : '';

    return (
        <Tabs type='toggle' fullwidth='true'>
            <Tabs.Tab renderAs="div" className={classString}>
                <Link to="/">
                    Initiative
                 </Link>
            </Tabs.Tab>
            <Tabs.Tab renderAs="div" className={classString}>
                <Link to="/hue">
                    Philips Hue
                    {console.log(window.location.pathname)}
                </Link>
            </Tabs.Tab>
        </Tabs>
    );
}

export default NavTabs;
