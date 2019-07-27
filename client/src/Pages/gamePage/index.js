import React, { Component } from 'react';
import axios from 'axios';
import GameCard from '../../components/gameCard';
import { Button } from 'react-bulma-components';
import { Link } from "react-router-dom";

class GamePage extends Component {
    state = {
        gameList: [],
    }

    componentDidMount() {
        this.loadGames();
    }

    loadGames = () => {
        axios.get('/api/v1/games/')
            .then(res => {
                let gameList = res.data;
                if (gameList !== this.state.gameList) {
                    this.setState({ gameList });
                }
            });
    };

    render() {
        return (
            <React.Fragment>
                <div >
                    {this.state.gameList.map(game => (
                        <GameCard
                            id={game.id}
                            key={game.id}
                            name={game.name}
                            secret={game.secret}
                        />
                    ))}
                </div>
                <Link to="/creategame">
                    <Button renderAs="button" color="warning"><span>Create New Game</span></Button>
                </Link>
            </React.Fragment>
        )
    }
}

export default GamePage;
