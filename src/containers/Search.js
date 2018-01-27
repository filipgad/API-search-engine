import React, { Component } from 'react'

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      universities: [],
      api: "http://localhost:9000/api/search?name=gdansk"
    }
  };

  componentWillMount() {
    this.searchAPI();
  }

  searchAPI = () => {
    fetch(this.state.api)
    .then(results => {
      if (results.ok)
        return results.json(); 
      else
        throw new Error('Błąd sieci!');
    }).then(university => {
      console.log(university);

      let univer = university.map( (uni, index) => {
        console.log(uni.name);
        if(uni.domains.length>=0) {
          console.log(uni.domains);
          var dom = uni.domains.map( (domain, index) => {
            return <li key={index}>{domain}</li>
          });
        }
        return (
          <ul key={index}>
            <li>University: <a href={uni.web_pages[0]}>{uni.name}</a></li>
            <li>Country: {uni.country}</li>
            <li>Country code: {uni.alpha_two_code}</li>
            <li>
              <ul>{dom}</ul>
            </li>
          </ul>
        )
      })
      this.setState({universities: univer});
      console.log("state", this.state.universities);
    })
  }


  render() {
    return (
      <div>
        {this.state.universities}
      </div>
    )
  }
}
