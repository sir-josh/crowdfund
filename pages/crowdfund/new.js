import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

export class NewCrowdfund extends Component {
    render() {
        return (
            <div>
                <h3>Create New Crowdfund project</h3>
                <Form>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <input />
                    </Form.Field>
                    <Button inverted>Create Project</Button>
                </Form>
            </div>
        )
    }
}

export default NewCrowdfund
