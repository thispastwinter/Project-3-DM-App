import React from 'react';
import { Card, Media, Heading } from 'react-bulma-components';
import MyButton from '../buttons';
import { Link } from 'react-router-dom';

const GameCard = (props) => {
    const admin = () => {
        
    }
    const checkForAdmin = () => {
        if (props.admin) {
            return (<Card.Footer.Item>
                <Link to={{
                    pathname: '/initadmin',
                    state: {
                        game_id: props.id,
                        secret: props.secret,
                        game_name: props.name,
                        admin: props.admin
                    }
                }}>
                    <MyButton static={true} text="Join Game" primary={true}>
                    </MyButton>
                </Link>
            </Card.Footer.Item>)
        }
        else {
            return ((<Card.Footer.Item>
                <Link to={{
                    pathname: '/init',
                    state: {
                        game_id: props.id,
                        secret: props.secret,
                        game_name: props.name,
                        admin: props.admin
                    }
                }}>
                    <MyButton static={true} text="Join Game" primary={true}>
                    </MyButton>
                </Link>
            </Card.Footer.Item>))
        }
    }

    return (
        <Card>
            <Card.Content>
                <Media>
                    <Media.Item position="left">
                        <Heading size={3}>Game Id: {props.id}</Heading>
                    </Media.Item>
                    <Media.Item>
                        <Heading size={3}>{props.name}</Heading>
                    </Media.Item>
                    <Media.Item>
                        <Heading size={3}>Secret: {props.secret}</Heading>
                    </Media.Item>
                </Media>
            </Card.Content>
            <Card.Footer>
                {checkForAdmin()}
            </Card.Footer>
        </Card>
    );
}

export default GameCard;