import React, { Component } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import { Button } from 'react-bulma-components';

class MonsterSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterName: '',
      monsterList: [],
      results: [],
    };
  }

  componentDidMount() {
    axios.get('/api/v1/monsters/list')
      .then(({ data: monsterList }) => this.setState({ monsterList }))
      .catch(console.error);
  };

  addMonster() {
    axios.post(`api/v1/characters/${this.state.monsterName}`)
      .then(result => { return result })
      .catch(console.error);
  }

  render() {
    return (
      <div>
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
        <Button color="danger" onClick={this.addMonster}></Button>
      </div>
    );
  }
}

export default MonsterSearch;
