import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import error404 from "../../_media/images/404.png";

class Error404 extends Component {

    css = `html,body,#root{ height: 100%; } #root { justify-content: center; align-items: center; display: flex; flex-wrap: wrap; }`;

    render() {
        return (<>
            <style>{this.css}</style>
            <Result subTitle="LO SENTIMOS, LA PÁGINA QUE BUSCAS NO EXISTE"
                icon={<img src={error404} alt="error404" className="error404" />}
                extra={<Link to="/">
                    <Button className="btn-black">IR A INICIO</Button>
                </Link>} />
        </>);
    };
};

export default Error404;
