import React, { Component } from 'react';
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import { Button, Card } from 'semantic-ui-react';

export class CrowdFundCreator extends Component {
    static async getInitialProps () {
        const allDeployedCrowdfund = await factory.methods.getAllDeployedCrownfund().call();
        
        return { crowdfunds: allDeployedCrowdfund }
    }

    renderCrowdfund() {
        const items = this.props.crowdfunds.map(crowdfund => {
            return {
                header: crowdfund,
                description: <a>View Project</a>,
                fluid: true
            }
        });

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open crowdfund projects</h3>
                    <Button floated="right" content="Create New Project" icon="add circle" style={{ backgroundColor: '#282c34',color: "white" }}></Button>
                    <p>{this.renderCrowdfund()}</p>
                </div>
            </Layout>
        )
    }
}

export default CrowdFundCreator;
