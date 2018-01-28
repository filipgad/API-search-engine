import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SelectCountry extends Component {
    render() {
        let countryArr = [];
        let country = this.props.universityResults.map( universityElem => {
            return universityElem.country
        }).forEach ( countryElem => {
            if (countryArr.indexOf(countryElem) < 0) { /* checking the repeatability of elements */
                countryArr.push(countryElem);
            }
        });
        countryArr.sort(); /* sort list of countries */
        let countries = countryArr.map( (countryArrElem, countryArrIndex) => {
            return <option key={countryArrIndex+1} value={countryArrElem}>{countryArrElem}</option>;
        });
        return (
            <select value={this.props.selected} onChange={this.props.handleCountryChange} className="select_container">
                <option key="0" value="all">All countries</option>
                {countries}
            </select>
        )
    }
}

SelectCountry.propTypes = {
    handleCountryChange: PropTypes.func,
    universityResults: PropTypes.array,
    selected: PropTypes.string
}