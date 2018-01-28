import React, { Component } from 'react'

import UniversityList from './UniversityList'
import SelectCountry from './SelectCountry'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selected: '',
      universityResults: []
    }
  };

  searchAPI = () => {
    fetch(`http://localhost:9000/api/search?name=${this.state.search}${this.state.selected == 'all' ? '' : `&country=${this.state.selected}`}`)
      .then(results => {
        if (results.ok)
          return results.json();
        else
          throw new Error('Błąd sieci!');
      }).then(universityResults => {
        this.setState({ universityResults: universityResults });
      }).catch(error => {
        console.error(error);
      });
  }

  handleNameChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.searchAPI();
  };

  handleCountryChange = (event) => {
    this.setState({ selected: event.target.value }, () => {
      this.searchAPI();
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Find university:
            <input type="text" value={this.state.search} onChange={this.handleNameChange} />
          </label>
          <input type="submit" value="Search" />
        </form>
        <SelectCountry universityResults={this.state.universityResults} handleCountryChange={this.handleCountryChange} selected={this.state.selected} />
        <UniversityList universityResults={this.state.universityResults} />
      </div>
    )
  }
}
