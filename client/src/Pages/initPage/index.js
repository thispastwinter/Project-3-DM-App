import React, { Component } from 'react';
import List from '../../components/list/index';
import InitCard from '../../components/initCard/index';
import axios from 'axios';
import io from 'socket.io-client';
import { Button, Container } from 'react-bulma-components';

class InitPage extends Component {
    state = {
        characterList: [],
        // endpoint: "localhost:3001"
    }

    constructor() {
        super();
        this.socket = io();
        // this.socket = io.connect(this.state.endpoint);
    }

    componentDidMount() {
        this.loadChars();
        let room = this.props.gameId;
        this.socket.on('connect', () => {
            // Connected, let's sign-up for to receive messages for this room
            this.socket.emit('room', room);
        });
        this.socket.on('listChange', (characterList) => {
            this.setState({ characterList });
        });
    }

    loadChars = () => {
        console.log("GameId: ", this.props.gameId);
        axios.get('/api/v1/characters/' + this.props.gameId)
            .then(res => {
                let characterList = res.data;
                if (characterList !== this.state.characterList) {
                    this.send(this.setState({ characterList }));
                }
            });
    };

    componentWillUnmount() {
        this.socket.disconnect();
    }

    send = async (func) => {
        await func
        this.socket.emit('listChange', this.state.characterList)
    }

    initSort = (array) => {
        const newArr = array.slice()
        newArr.sort((a, b) => {
            return b.initiative - a.initiative;
        });
        this.turnOrderUpdate(newArr);
    }

    turnOrderUpdate = (array) => {
        for (let i = 0; i < array.length; i++) {
            array[i].turn_order = i + 1;
        }
        axios.put('/api/v1/characters', { array });
        this.send(this.setState((state) => {
            return { characterList: array };
        }));
    }

    turnDone = (id) => {
        const characterList = this.state.characterList.slice();
        characterList.push(...characterList.splice(characterList.findIndex(c => c.id === id), 1))
        this.turnOrderUpdate(characterList);
    }

    editChar = (updatedCharacter) => {
        const updateId = updatedCharacter.id
        axios.post('/api/v1/characters/' + updateId, {
            hit_points: updatedCharacter.hit_points,
            initiative: updatedCharacter.initiative,
        });
        this.send(this.setState({
            characterList: this.state.characterList
                .map((character) => character.id === updatedCharacter.id ? updatedCharacter : character)
        }));
    }

    removeChar = (id) => {
        let remId = id;
        const characterList = this.state.characterList.slice();
        characterList.splice(characterList.findIndex(c => c.id === id), 1);
        axios.delete('/api/v1/characters/' + remId);
        this.send(this.setState({ characterList }));
    }

    resetEncounter = () => {
        const characterList = this.state.characterList.slice();
        characterList.map(obj => {
            return obj.initiative = parseInt(0);
        });
        this.turnOrderUpdate(characterList);
        // this.send(this.setState({ characterList }));
    }

    render() {
        return (
            <div>
                <List >
                    {this.state.characterList.map(character => (
                        <InitCard
                            character={character}
                            id={character.id}
                            key={character.id}
                            image={character.image}
                            ac={character.armor_class}
                            init={character.initiative}
                            name={character.name}
                            health={character.hit_points}
                            turnDone={this.turnDone}
                            editInit={this.editChar}
                            editHealth={this.editChar}
                            removeChar={this.removeChar}
                            currentOrder={this.state.characterList}
                        />
                    ))}
                </List>
                <Container id="buttons" fluid>
                    <Button color="success" onClick={this.resetEncounter}>Reset Encounter</Button>
                    <Button color="success" onClick={() => this.initSort(this.state.characterList)}>Initiative Sort</Button>
                </Container>
            </div>
        )
    }
}

export default InitPage;
