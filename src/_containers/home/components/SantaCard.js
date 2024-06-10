import React from "react";
import { Card, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const SantaCard = ({ data }) => {
    return (<Col xs={24} className="santa-card" data-testid="santa-card">
        <Card>
            {data.map((e, i) => <span className="person-text" key={`${e}-${i}`}>{e}{i !== data.length - 1 && <ArrowRightOutlined />}</span>)}
        </Card>
    </Col>);
};

export default SantaCard;
