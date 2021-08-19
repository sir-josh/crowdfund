import React, { Component } from 'react';
import Layout from '../../components/Layout';
import CrowdfundInstance from '../../ethereum/crowdfund';

export class ShowCrowdfund extends Component {
    static async getInitialProps(props) {
        const crowdfund = CrowdfundInstance(props.query.address);  //Add in url address paramater to the function

        const crowdfundStats = await crowdfund.methods.getCrowdFundStats().call();

        console.log(crowdfundStats);

        return {};
    }

    render() {
        return (
            <Layout>
                <h3>All Crowdfund Projects</h3>
            </Layout>
        )
    }
}

export default ShowCrowdfund;