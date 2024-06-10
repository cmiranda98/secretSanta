import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Spin } from "antd";
import { RestoreFromMemory } from "../../_action/processor";
const { Header, Content } = Layout;

class CustomLayout extends Component {

    componentDidMount() {
        this.action.Restore();
    };

    action = {
        Restore: () => {
            this.props.RestoreFromMemory();
        }
    };

    render() {
        var { children, loadingMembers } = this.props;

        return (<Layout>
            <Header className="header">SECRET SANTA</Header>
            <Layout>
                <Content>
                    <Spin spinning={loadingMembers} size="large" fullscreen />
                    {children}
                </Content>
            </Layout>
        </Layout>);
    };
};

function Redux(state) {
    return {
        loadingMembers: state.santa.loadingMembers
    };
};

export default connect(Redux, {
    RestoreFromMemory
})(CustomLayout);
