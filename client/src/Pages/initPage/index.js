import React, { Component } from 'react';
import InitCard from '../../components/initCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { Button, Container } from 'react-bulma-components';
// import NavTabs from "../../components/navTabs";

class InitPage extends Component {
    state = {
        characterList: [],
        game_id: null,
        // endpoint: "localhost:3001"
    }

    constructor() {
        super();
        this.socket = io();
        // this.socket = io.connect(this.state.endpoint);
    }

    componentDidMount() {
        this.loadChars();
        let room = this.props.location.state.game_id;
        this.socket.on('connect', () => {
            // Connected, let's sign-up for to receive messages for this room
            this.socket.emit('room', room);
        });
        this.socket.on('listChange', (characterList) => {
            this.setState({ characterList });
        });
    }

    loadGameId = () => {
        let game_id = this.props.location.state.game_id;
        this.setState({ game_id });
    }

    loadChars = async () => {
        await this.loadGameId();
        axios.get('/api/v1/characters/' + this.state.game_id)
            .then(res => {
                let characterList = res.data;
                if (characterList.length === 0) {
                    alert("No Characters here yet");
                }
                else if (characterList !== this.state.characterList) {
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
            armor_class: updatedCharacter.armor_class
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
    }

    render() {
        return (
            <React.Fragment>
                {/* <NavTabs game_id={this.state.game_id} /> */}
                <h1 className="title-1 title-2">Game: {this.props.location.state.game_name}</h1>
                <h1 className="title-1 title-2">Secret: {this.props.location.state.secret}</h1>
                <div >
                    {this.state.characterList.map(character => (
                        <InitCard
                            className="card"
                            character={character}
                            id={character.id}
                            key={character.id}
                            image={character.image}
                            armorClass={character.armor_class}
                            init={character.initiative}
                            name={character.name}
                            health={character.hit_points}
                            turnDone={this.turnDone}
                            editChar={this.editChar}
                            removeChar={this.removeChar}
                            currentOrder={this.state.characterList}
                            isMonster={character.isMonster}
                        />
                    ))}
                </div>
                <Container id="buttons" fluid>
                    <Link to={{
                        pathname: '/createcharacter',
                        state: {
                            game_id: this.props.location.state.game_id,
                            secret: this.props.location.state.secret,
                            game_name: this.props.location.state.game_name
                        }
                    }}>
                        <Button color="warning">
                            Create Character
                        </Button>
                    </Link>
                </Container>
            </React.Fragment>
        )
    }
}

export default InitPage;
