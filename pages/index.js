import React, { Component } from 'react';
import factory from '../ethereum/factory';

export class CrowdFundCreator extends Component {
    async componentDidMount(){
        const allDeployedCrowdfund = await factory.methods.getAllDeployedCrownfund().call();

        console.log(allDeployedCrowdfund);
    }

    render() {
        return (
            <div>
                <h1>This is the index page</h1>
            </div>
        )
    }
}

export default CrowdFundCreator;
