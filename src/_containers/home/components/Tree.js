import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Space, Tree } from "antd";
import { CloseOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, AlertType, CloneObject, MoveTree, RemoveNodeTree } from "../../../_utility";
import { useDispatch, useSelector } from "react-redux";
import { ModifyMembers } from "../../../_action/processor";

const TreeManager = () => {
    const [form] = Form.useForm(), Dispatch = useDispatch(), { members } = useSelector((state) => state.santa);
    const [tree, SetTree] = useState([]), [restored, SetRestored] = useState(false);

    useEffect(() => {
        if (members.length > 0 && restored === false) {
            SetTree(members);
            SetRestored(true);
        }
    }, [members, restored]);

    const SetTreeWrapper = (data) => {
        SetTree(data);
        Dispatch(ModifyMembers(data));
    };

    const isNameOnTree = (name) => {
        let duplicate = false;
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].title === name || duplicate === true) {
                duplicate = true;
                break;
            }
            if (tree[i].children)
                for (let j = 0; j < tree[i].children.length; j++) {
                    if (tree[i].children[j].title === name) {
                        duplicate = true;
                        break;
                    }
                }
        }
        return duplicate;
    };

    const AddNameOnTree = (name) => {
        let treeTemp = CloneObject(tree);
        treeTemp.push({
            title: name,
            key: name
        });
        SetTreeWrapper(treeTemp);
    };

    const MoveOnTree = (data) => {
        SetTreeWrapper(MoveTree(data, tree));
    };

    const RemoveOnTree = (name) => {
        let treeTemp = CloneObject(tree);
        SetTreeWrapper(RemoveNodeTree(name, treeTemp));
    };

    return (<>
        <Row gutter={32} justify="center">
            <Col xs={24} sm={12} className="text-center">
                <h2>AGREGA LOS NOMBRES</h2>
            </Col>
        </Row>
        <Row gutter={32} justify="center">
            <Col xs={24} sm={12}>
                <Form name="form" form={form} onFinish={(values) => {
                    if (isNameOnTree(values.nombre)) Alert("La persona ya se encuentra en la lista", AlertType.error);
                    else {
                        AddNameOnTree(values.nombre);
                        form.resetFields();
                        Alert("Persona añadida", AlertType.info);
                    }
                }}>
                    <Form.Item name="nombre" rules={[{ required: true, whitespace: false }]}>
                        <Space.Compact style={{ width: '100%' }} size="large">
                            <Input placeholder="Ingrega el nombre..." maxLength={50} />
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => form.submit()}>AGREGAR</Button>
                        </Space.Compact>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        <Row gutter={32}>
            <Col xs={24}>
                <Tree className="draggable-tree" draggable blockNode showLine showIcon icon={<UserOutlined />} treeData={tree} onDrop={MoveOnTree} titleRender={(e) => {
                    return <><span>{e.title}</span><span className="btn-remove" onClick={() => RemoveOnTree(e.key)}><CloseOutlined /></span></>;
                }} />
            </Col>
        </Row>
    </>);
};

export default TreeManager;
