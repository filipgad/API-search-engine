import React, { Component } from 'react'

import UniversityList from './UniversityList'
import SelectCountry from './SelectCountry'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selected: '',
      universityResults: [],
      loading: false
    }
  };

  /* 
    Search API 
  */
  searchAPI = () => {
    fetch(`http://localhost:9000/api/search?name=${this.state.search}${this.state.selected == 'all' ? '' : `&country=${this.state.selected}`}`)
      .then(results => {
        if (results.ok)
          return results.json();
        else
          throw new Error('Błąd sieci!');
      }).then(universityResults => {
        this.setState({ loading: false, universityResults: universityResults });
      }).catch(error => {
        console.error(error);
      });
  }

  /*
    Handle value of search
  */
  handleNameChange = (event) => {
    this.setState({ search: event.target.value });
  };

  /*
    Handle submit of search
  */
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ selected: 'all' }, () => {
      if (this.state.search == '') {
        this.setState({ universityResults: [] });
      } else {
        this.setState({ loading: true });
        this.searchAPI();
      }
    });
  };

  /*
    Handle value of selected country
  */
  handleCountryChange = (event) => {
    this.setState({ selected: event.target.value, loading: true }, () => {
      this.searchAPI();
    });
  }

  render() {

    /*
      Loading/Result status
    */
    let result;
    if (this.state.loading) {
      result = <h1>Loading...</h1>;
    } else {
      result = this.state.universityResults.length < 1 ? <h1>No results...</h1> : <UniversityList universityResults={this.state.universityResults} />
    }

    return (
      <div>
        <header>
          <form onSubmit={this.handleSubmit} className="search_container">
            <label>
              <input type="text" value={this.state.search} onChange={this.handleNameChange} placeholder="Find university" id="search" />
            </label>
            <input type="submit" value="Search" id="submit" />
          </form>
          <SelectCountry universityResults={this.state.universityResults} handleCountryChange={this.handleCountryChange} selected={this.state.selected} />
        </header>
        {result}
      </div>
    )
  }
}
