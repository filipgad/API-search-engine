import React, { Component } from 'react'

export default class University extends Component {
    render() {
        
        return (
            <div className="university">
                <ul>
                    <li>University: <a href={this.props.universityElem.web_pages[0]}>{this.props.universityElem.name}</a></li>
                    <li>Country: {this.props.universityElem.country}</li>
                    <li>Country code: {this.props.universityElem.alpha_two_code}</li>
                    <li>Domains: 
                        <ul>{this.props.domainsList}</ul>
                    </li>
                </ul>
            </div>
        )
    }
}