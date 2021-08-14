import React, { Component } from 'react';
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import { Button } from 'semantic-ui-react';

export class CrowdFundCreator extends Component {
    static async getInitialProps () {
        const allDeployedCrowdfund = await factory.methods.getAllDeployedCrownfund().call();
        
        return { crowdfunds: allDeployedCrowdfund }
    }

    renderCrowdfund() {

    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open crowdfund projects</h3>
                    <p>{this.props.crowdfunds[0]}</p>
                    <Button content="Create New Project" icon="add circle" primary></Button>
                </div>
            </Layout>
        )
    }
}

export default CrowdFundCreator;
