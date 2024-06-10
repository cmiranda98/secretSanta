import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FloatButton, Row, Col, Divider, Button, Skeleton, Drawer } from "antd";
import { NumberOutlined, QuestionOutlined, StopOutlined } from "@ant-design/icons";
import Layout from "../utility/layout";
import TreeManager from "./components/Tree";
import { GenerateData } from "../../_action/processor";
import SantaCard from "./components/SantaCard";

const Index = () => {
    const Dispatch = useDispatch(), [error, SetError] = useState(false), [loading, Setloading] = useState(false), [open, SetOpen] = useState(false);;
    const { sortedMembers, loadingSortedMembers } = useSelector((state) => state.santa);

    const DoSantaWork = () => {
        Setloading(true);
        let to = setTimeout(() => {
            Dispatch(GenerateData(() => {
                Setloading(false);
                clearTimeout(to);
            }));
        }, 250);
    };
    const closeDrawer = () => {
        SetOpen(false);
    };

    if (error) throw Error("EXECUTE ORDER 66");
    return (<Layout>
        <Row gutter={32}>
            <Col xs={24}>
                <TreeManager />
            </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={32} justify="center">
            <Col xs={24} sm={12} className="text-center">
                <Button size="large" onClick={DoSantaWork} disabled={loadingSortedMembers || loading} loading={loadingSortedMembers || loading}>¡CREAR SANTA SECRETO!</Button>
            </Col>
        </Row>
        <Divider></Divider>
        {(loadingSortedMembers === true || loading === true) ? <Row gutter={32}>
            <Col xs={24}>
                <Skeleton active />
            </Col>
            <Col xs={24}>
                <Skeleton active />
            </Col>
        </Row> : <Row gutter={32}>
            {sortedMembers.map((e) => <SantaCard key={e.join()} data={e} />)}
        </Row>}
        <Drawer title="INSTRUCCIONES" onClose={closeDrawer} open={open}>
            <p>1.- Primero debes de agregar los nombres de las personas. (El mismo nombre no se puede añadir dos veces)</p>
            <p>2.- Puedes ordenar a las personas arrastrandolas. (Se permite un nivel de profundidad infinito)</p>
            <p>3.- Da click en el boton de "¡CREAR SANTA SECRETO!"</p>
            <p>4.- En la parte inferior saldran tarjetas con las personas acomodadas en orden, en caso contrario una alerta sera enseñada.</p>
            <p>NOTAS:</p>
            <p>1.- Los excluidos son los padres e hijos, los hermanos si pueden salir.</p>
            <p>2.- Abajo hay botones para poder ver la funcionalidad de 404 y errorBoundary.</p>
            <p>3.- Si el nivel de complejidad es muy alto, saldra una alerta, esto se debe a que el algoritmo puede irse a limites inalcanzables.</p>
            <p>4.- Si no se obtienen posibles resultados, saldra una alerta.</p>
            <p>5.- Si no se tienen nombres, saldra una alerta.</p>
            <p>6.- Solo se muestran las opciones que cumplan con los requisitos, por lo que habra veces que solo se muestren pocas tarjetas.</p>
            <p>7.- Se usa localStorage, por lo que los nombres permaneceran aunque recargues la pagina.</p>
        </Drawer>
        <FloatButton.Group shape="square" style={{ right: 25 }}>
            <FloatButton icon={<QuestionOutlined />} onClick={() => SetOpen(true)} tooltip="AYUDA" />
            <FloatButton icon={<StopOutlined />} onClick={() => SetError(true)} tooltip="PRUEBA ERRORBOUNDARY" />
            <FloatButton icon={<NumberOutlined />} onClick={() => window.location = "/other"} tooltip="PRUEBA 404" />
            <FloatButton.BackTop visibilityHeight={500} type="primary" />
        </FloatButton.Group>
    </Layout >);
}

export default Index;
