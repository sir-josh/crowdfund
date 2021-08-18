import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

export class NewCrowdfund extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    submitFormCreation = async(event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();
        this.setState({ loading: true, errorMessage: '' });

        try {
            await factory.methods.deployNewCrowdFund(
                this.state.minimumContribution, 
                "Cregaig",
                "Mix & match travelling bag with sections to create the perfect adventure kit. Adapts to carry toiletries, chargers, gear, tools, & life’s little things",
                "Parker Thomas"
            ).send({
                from: accounts[0]
            });

            //Redirect to homepage after successfull creating new crowdfund to the blockchain
            Router.pushRoute('/');
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <h3>Create New Crowdfund project</h3>
                <Form onSubmit={this.submitFormCreation} error={!!this.state.errorMessage}>
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
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} content="Create project" style={{ backgroundColor: '#282c34',color: "white" }}></Button>
                </Form>
            </Layout>
        )
    }
}

export default NewCrowdfund;
