import React, { Component } from 'react';
import { Form, Button,Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';

export class NewCrowdfund extends Component {
    render() {
        return (
            <Layout>
                <h3>Create New Crowdfund project</h3>
                <Form>
                    <Form.Field>
                        <label>Minimum contribution (wei)</label>
                        <Input label="wei" labelPosition="right" placeholder="Amount to donate" />
                    </Form.Field>
                    <Button content="Create project" style={{ backgroundColor: '#282c34',color: "white" }}></Button>
                </Form>
            </Layout>
        )
    }
}

export default NewCrowdfund;
