import React, { Component } from 'react';
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';

export class CrowdFundCreator extends Component {
    static async getInitialProps () {
        const allDeployedCrowdfund = await factory.methods.getAllDeployedCrownfund().call();
        
        return { crowdfunds: allDeployedCrowdfund }
    }

    render() {
        return (
            <div>
                <h1>This is the index page</h1>
                <p>{this.props.crowdfunds[0]}</p>
            </div>
        )
    }
}

export default CrowdFundCreator;
