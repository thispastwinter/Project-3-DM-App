import React, { Component } from 'react';
import axios from 'axios';
import GameCard from '../../components/gameCard';
// import { Button, Container } from 'react-bulma-components';

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
                console.log(gameList);
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
                        />
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

export default GamePage;
