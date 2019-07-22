import React, { Component } from 'react';
import List from '../list/index';
import InitCard from '../initCard/index';
import axios from 'axios';
// import io from 'socket.io-client';
// Works better on localhost
import socketIOClient from 'socket.io-client';
import { Button, Container } from 'react-bulma-components';

class InitPage extends Component {
    state = {
        characterList: [],
        endpoint: "localhost:3001"
    }

    constructor() {
        super();
        this.socket = socketIOClient(this.state.endpoint);
        // this.socket = io();
    }


    componentDidMount() {
        // if (this.state.characterList.length === 0) {
        //     this.loadChars()
        // }
        this.loadChars();
        // window.addEventListener("beforeunload", this.onUnload);
        // const stateObject = JSON.parse(localStorage.getItem("state"));
        // this.setState(stateObject);

        // console.log("Component Mounted state", this.state.characterList);


        this.socket.on('listChange', (characterList) => {
            console.log('Change received Component');
            this.setState({ characterList });
        });
    }

    loadChars = () => {
        axios.get('/api/v1/characters')
            .then(res => {
                let characterList = res.data;
                console.log("Load chars axios response", characterList);
                console.log("Load Chars State", this.state.characterList)
                if (characterList !== this.state.characterList) {
                    // this.setState({ characterList });
                    this.send(this.setState({ characterList }));
                }
            });
    };

    // onUnload = (event) => {
    //     localStorage.setItem("state", JSON.stringify(this.state));
    // }

    componentWillUnmount() {
        // window.removeEventListener("beforeunload", this.onUnload)
        this.socket.disconnect();
    }

    send = async (func) => {
        await func
        this.socket.emit('listChange', this.state.characterList)
        console.log('Sending List Change');
    }

    initSort = (array) => {
        const newArr = array.slice()
        newArr.sort((a, b) => {
            return b.initiative - a.initiative;
        });
        for (let i = 0; i < newArr.length; i++) {
            newArr[i].turn_order = i + 1;
        }
        console.log("newArr", newArr);
        axios.put('/api/v1/characters', { newArr })
            .then(res => {
                console.log("Axios Response", res);
            });

        this.send(this.setState((state) => {
            return { characterList: newArr };
        }));
    }

    //Need logic to update turn order on each member of the array and send the 
    turnDone = (id) => {
        const characterList = this.state.characterList.slice();
        characterList.push(...characterList.splice(characterList.findIndex(c => c.id === id), 1))
        characterList[characterList.length - 1].turn_order = (characterList.length - 1);
        console.log(characterList[characterList.length - 1].turn_order);
        this.send(this.setState({ characterList }));
    }

    editChar = (updatedCharacter) => {
        console.log(updatedCharacter);
        axios.post('/api/v1/characters', {
            hit_points: updatedCharacter.hit_points,
            initiative: updatedCharacter.initiative,
            id: updatedCharacter.id,
            turn_order: updatedCharacter.turn_order
        })
            .then(res => {
                console.log(res);
            });
        this.send(this.setState({
            characterList: this.state.characterList
                .map((character) => character.id === updatedCharacter.id ? updatedCharacter : character)
        }));
    }

    removeChar = (id) => {
        const characterList = this.state.characterList.slice();
        characterList.splice(characterList.findIndex(c => c.id === id), 1);
        this.send(this.setState({ characterList }));
    }

    resetEncounter = () => {
        const characterList = this.state.characterList.slice();
        characterList.map(obj => {
            return obj.initiative = parseInt(0);
        });
        this.send(this.setState({ characterList }));
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
