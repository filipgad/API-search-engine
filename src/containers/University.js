import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class University extends Component {
    render() {
        return (
            <div className="university">
                <ul>
                    <li><span>University:</span> <a href={this.props.universityElem.web_pages[0]} target="_blank">{this.props.universityElem.name}</a></li>
                    <li><span>Country:</span> {this.props.universityElem.country}</li>
                    <li><span>Country code:</span> {this.props.universityElem.alpha_two_code}</li>
                    <li>
                        <span>Domains:</span> 
                        <ul>{this.props.domainsList}</ul>
                    </li>
                </ul>
            </div>
        )
    }
}

University.propTypes = {
    universityElem: PropTypes.object,
    domainsList: PropTypes.array
};