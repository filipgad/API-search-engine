import React, { Component } from 'react'

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      selected: '',
      universities: [],
      countries: []
    }
  };

  searchAPI = () => {
    fetch(`http://localhost:9000/api/search?name=${this.state.search}${ this.state.selected == 'all' ? '' : `&country=${this.state.selected}`}`)
    .then(results => {
      if (results.ok)
        return results.json(); 
      else
        throw new Error('Błąd sieci!');
    }).then(university => {

      let universities = university.map( (universityElem, universityIndex) => {
        if(universityElem.domains.length>=0) {
          var domainsList = universityElem.domains.map( (domainElem, domainIndex) => {
            return <li key={domainIndex}>{domainElem}</li>
          });
        }
        return (
          <ul key={universityIndex}>
            <li>University: <a href={universityElem.web_pages[0]}>{universityElem.name}</a></li>
            <li>Country: {universityElem.country}</li>
            <li>Country code: {universityElem.alpha_two_code}</li>
            <li>Domains: 
              <ul>{domainsList}</ul>
            </li>
          </ul>
        )
      })
      let countryArr = [];
      let country = university.map( universityElem => {
        return universityElem.country
      }).forEach ( countryElem => {
        if (countryArr.indexOf(countryElem) < 0) {
          countryArr.push(countryElem);
        }
      });
      countryArr.sort();
      let countries = countryArr.map( (countryArrElem, countryArrIndex) => {
        return (
          <option key= {countryArrIndex+1} value={countryArrElem}>{countryArrElem}</option>
        )
      });
      this.setState({
        universities: universities,
        countries: countries 
      });
    }).catch(error => {
      console.error(error);
    });
  }

  handleNameChange = (event) => { 
    this.setState({search: event.target.value});
  };

  handleSubmit = (event) => { 
    event.preventDefault();
    this.searchAPI();
  };

  handleCountryChange = (event) => {
    this.setState({selected: event.target.value}, () => {
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
          <label>
            Select country:
            <select value={this.state.selected} onChange={this.handleCountryChange}>
              <option key="0" value="all">All</option>
              {this.state.countries}
            </select>
          </label>
        <div>
            {this.state.universities}
        </div>
      </div> 
    )
  }
}
