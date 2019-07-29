import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container } from 'react-bulma-components';
import './index.css';

class CreateCharacterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            armor_class: '',
            hit_points: '',
            game_id: null,
            strength: '',
            dexterity: '',
            constitution: '',
            intelligence: '',
            wisdom: '',
            charisma: '',
            isMonster: false,
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        this.loadGameId();
    }

    validateForm() {
        return this.state.name.length > 0;
    };

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            [event.target.id]: value
        });
    }

    loadGameId = () => {
        let game_id = this.props.location.state.game_id;
        this.setState({ game_id });
    }

    async handleLogin(event) {
        event.preventDefault();


        try {
            const response = await axios.post('api/v1/characters', {
                name: this.state.name,
                armor_class: parseInt(this.state.armor_class),
                hit_points: parseInt(this.state.hit_points),
                image: './images/orc.png',
                strength: parseInt(this.state.strength),
                dexterity: parseInt(this.state.dexterity),
                constitution: parseInt(this.state.constitution),
                intelligence: parseInt(this.state.intelligence),
                wisdom: parseInt(this.state.wisdom),
                charisma: parseInt(this.state.charisma),
                game_id: this.props.location.state.game_id,
                isMonster: this.state.isMonster
            });
            if (response.data) {
                this.setState({
                    createSuccess: true,
                });
            } else {
                console.log('error on createCharacter');
            }
        } catch (err) {
            if (err) throw err;
            this.setState({
                createSuccess: false,
            })
        }
    }

    render() {
        if (this.state.createSuccess) {
            return <Redirect to={{
                pathname: '/init',
                state: {
                    game_id: this.state.game_id,
                    secret: this.props.location.state.secret,
                    game_name: this.props.location.state.game_name
                }
            }} />
        }

        return (
            <div className="createCharacter">
                <h1 className="title">Create New Character</h1>
                <form onSubmit={this.handleSubmit}>
                    <Container>
                        <Form.Label>Name</Form.Label>
                        <Form.Input
                            value={this.state.name}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="name"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Armor Class</Form.Label>
                        <Form.Input
                            value={this.state.armor_class}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="armor_class"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Hit Points</Form.Label>
                        <Form.Input
                            value={this.state.hit_points}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="hit_points"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Strength</Form.Label>
                        <Form.Input
                            value={this.state.strength}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="strength"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Dexterity</Form.Label>
                        <Form.Input
                            value={this.state.dexterity}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="dexterity"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Constitution</Form.Label>
                        <Form.Input
                            value={this.state.constitution}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="constitution"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Intelligence</Form.Label>
                        <Form.Input
                            value={this.state.intelligence}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="intelligence"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Wisdom</Form.Label>
                        <Form.Input
                            value={this.state.wisdom}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="wisdom"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Charisma</Form.Label>
                        <Form.Input
                            value={this.state.charisma}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="charisma"
                        />
                    </Container>
                    <Button
                        disabled={!this.validateForm()}
                        type="submit"
                        color="success"
                        onClick={this.handleLogin}
                    >
                        Create Character
          </Button>
                </form>
            </div>
        );
    }
}

export default CreateCharacterPage;