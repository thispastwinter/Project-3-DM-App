import React, { Component } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import MyButton from '../buttons'

class MonsterSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterName: '',
      monsterList: [],
      game_id: null,
      // results: [],
    };
    this.addMonster = this.addMonster.bind(this);
  }
 
  componentDidMount() {
    this.loadGameId();
    axios.get('/api/v1/monsters/list')
      .then(({ data: monsterList }) => this.setState({ monsterList }))
      .catch(console.error);
  };

  loadGameId = () => {
    let game_id = this.props.game_id;
    this.setState({ game_id });
    console.log('GAME_ID', game_id);
  };

  addMonster(game_id) {
    // axios.get(`api/v1/monsters/${this.state.monsterName}`)
    //   .then(
    //     ({ data: results }) => this.setState({ results }))
    //   .catch(console.error);
    axios.post('api/v1/characters/name/' + this.state.monsterName + '&' + game_id)
      .then(() => {
        this.setState({ monsterName: '' });
        this.props.loadChars()
      })
      .catch(console.error);
  }

  render() {
    return (
      <div id="monsterSearch">
        <Autocomplete
          getItemValue={(monster) => monster.name}
          items={this.state.monsterList}
          shouldItemRender={(monster, value) =>
            monster.name.toLowerCase().includes(value.toLowerCase())
          }
          renderItem={(monster, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {monster.name}
            </div>
          }
          value={this.state.monsterName}
          onChange={(e) => this.setState({ monsterName: e.target.value })}
          onSelect={(val) => this.setState({ monsterName: val })}
        />
        <MyButton className="searchbutton" id="monsterSearchButton" text="Add Monster" primary={false} onClick={() => this.addMonster(this.state.game_id)}></MyButton>
      </div>
    );
  }
}

export default MonsterSearch;
