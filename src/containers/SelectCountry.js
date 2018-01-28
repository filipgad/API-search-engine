import React, { Component } from 'react'

export default class SelectCountry extends Component {
    render() {
        let countryArr = [];
        let country = this.props.universityResults.map( universityElem => {
            return universityElem.country
        }).forEach ( countryElem => {
            if (countryArr.indexOf(countryElem) < 0) {
            countryArr.push(countryElem);
            }
        });
        countryArr.sort();
        let countries = countryArr.map( (countryArrElem, countryArrIndex) => {
            return (
            <option key={countryArrIndex+1} value={countryArrElem}>{countryArrElem}</option>
            )
        });
        return (
            <label>
                Select country:
                <select value={this.props.selected} onChange={this.props.handleCountryChange}>
                    <option key="0" value="all">All</option>
                    {countries}
                </select>
            </label>
        )
    }
}