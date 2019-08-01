import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Container, Heading } from 'react-bulma-components';
import './index.css';
import images from './images.json';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import MyButton from '../../components/buttons'

const imageList = images;

class CreateCharacterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
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
        this.onPick = this.onPick.bind(this)
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        this.loadGameId();
        window.scrollTo(0, 0);
    }

    onPick(image) {
        this.setState({ image })
        console.log(image.src)
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
                image: this.state.image.src,
                armor_class: parseInt(this.state.armor_class),
                hit_points: parseInt(this.state.hit_points),
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
                console.log(this.state.createSuccess);
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

    checkForAdmin = () => {
        if (this.props.location.state.admin) {
            console.log("Admin is true");
            return <Redirect to={{
                pathname: '/initadmin',
                state: {
                    game_id: this.state.game_id,
                    secret: this.props.location.state.secret,
                    game_name: this.props.location.state.game_name,
                    admin: this.props.location.state.admin
                }
            }} />
        }
        else {
            console.log("Admin is ");
            return (<Redirect to={{
                pathname: '/init',
                state: {
                    game_id: this.state.game_id,
                    secret: this.props.location.state.secret,
                    game_name: this.props.location.state.game_name
                }
            }} />)
        }
    }

    render() {
        if (this.state.createSuccess) {
            if (this.props.location.state.admin) {
                return <Redirect to={{
                    pathname: '/initadmin',
                    state: {
                        game_id: this.state.game_id,
                        secret: this.props.location.state.secret,
                        game_name: this.props.location.state.game_name,
                        admin: this.props.location.state.admin
                    }
                }} />
            }
            else {
                return (<Redirect to={{
                    pathname: '/init',
                    state: {
                        game_id: this.state.game_id,
                        secret: this.props.location.state.secret,
                        game_name: this.props.location.state.game_name
                    }
                }} />)
            }
        }

        return (
            <div className="createCharacter">
                 <Heading className="title-1">Create New Character</Heading>
                <form onSubmit={this.handleSubmit}>

                    <Container>
                        <Form.Label>Character Name</Form.Label>
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
                    <Container className="images">
                        <Form.Label>Select An Avatar:</Form.Label>

                        <ImagePicker
                            images={imageList.map(image => ({ src: image.image, value: image.id }))}
                            onPick={this.onPick}
                        />

                    </Container>
                    <Container id="buttons" fluid>
                        <MyButton
                            text="Create Character"
                            primary={true}
                            type="submit"
                            disabled={!this.validateForm()}
                            onClick={this.handleLogin}
                        />
                    </Container>
                </form>
            </div>
        );
    }
}

export default CreateCharacterPage;