import React, { Component } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
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
    axios.get(`/api/v1/monsters/list`)
      .then(({ data: monsterList }) => this.setState({ monsterList }))
      .catch(console.error);
  };

  render() {
    return (
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
    );
  }
}

export default MonsterSearch;
