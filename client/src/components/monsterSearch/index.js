import React, { Component } from 'react'
import axios from 'axios' 

class Search extends Component {
  state = {
    query: {},
    // monsterList: [],
    results: [],
  }

  componentDidMount();

  getInfo = () => {
    axios.get(`api/v1/monsters/${this.state.query}`, {
      name: this.state.query
    })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          results: data
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      }
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
      </form>
    )
  }
}

export default Search;