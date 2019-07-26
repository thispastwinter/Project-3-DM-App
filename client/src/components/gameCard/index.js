import React from 'react';
import { Card, Media, Heading, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';

const GameCard = (props) => {

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
                </Media>
            </Card.Content>
            <Card.Footer>
                <Card.Footer.Item>
                    <Link to={{
                        pathname: '/init',
                        state: {
                            gameId: props.id
                        }
                    }}>
                        <Button color="success">
                            Join Game
                        </Button>
                    </Link>
                </Card.Footer.Item>
            </Card.Footer>
        </Card>
    );
}

export default GameCard;