import React, { Component } from "react";
import { Result, Button } from "antd";
import santaSad from "../../_media/images/santa-sad.png";

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    };

    css = `html,body,#root{ height: 100%; } #root { justify-content: center; align-items: center; display: flex; flex-wrap: wrap; }`;

    static getDerivedStateFromError(e) {
        return { hasError: true };
    };

    componentDidCatch(error, info) {
        console.log(error.stack);
    }

    render() {
        const { hasError } = this.state, { children } = this.props;

        if (hasError) return (<>
            <style>{this.css}</style>
            <Result subTitle="LO SENTIMOS, OCURRIO UN ERROR EN LA APLICACIÓN :("
                icon={<img src={santaSad} alt="santaSad" className="errorBoundary" />}
                extra={<Button onClick={() => { window.location = "/"; }} className="btn-black">IR A INICIO</Button>} />
        </>);
        return (<>{children}</>);
    };
}

export default ErrorBoundary;
