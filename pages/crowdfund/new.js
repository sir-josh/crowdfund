import React, { Component } from 'react';
import { Form, Button,Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

export class NewCrowdfund extends Component {
    state = {
        minimumContribution: ''
    }

    submitFormCreation = async(event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        await factory.methods.deployNewCrowdFund(
            this.state.minimumContribution
        ).send({
            from: accounts[0]
        });
    }

    render() {
        return (
            <Layout>
                <h3>Create New Crowdfund project</h3>
                <Form onSubmit={this.submitFormCreation}>
                    <Form.Field>
                        <label>Minimum contribution (wei)</label>
                        <Input 
                            label="wei" 
                            labelPosition="right" 
                            placeholder="Amount to donate" 
                            style={{ width: "60%"}}
                            value={this.state.minimumContribution}
                            onChange={
                                event => this.setState({ minimumContribution: event.target.value })
                            }
                        />
                    </Form.Field>
                    <Button content="Create project" style={{ backgroundColor: '#282c34',color: "white" }}></Button>
                </Form>
            </Layout>
        )
    }
}

export default NewCrowdfund;
