import React, { Component } from 'react'

import University from './University'

export default class UniversityList extends Component {
    render() {
        let universityList = this.props.universityResults.map( (universityElem, universityIndex) => {
            var domainsList = universityElem.domains.map( (domainElem, domainIndex) => {
                return <li key={domainIndex}>{domainElem}</li>
            });
            return <University key={universityIndex} universityElem={universityElem} domainsList={domainsList}/>
        });
        return (
            <div>
                {universityList}
            </div>
        )
    }
}