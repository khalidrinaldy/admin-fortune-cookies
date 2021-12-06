import { useEffect, useState } from "react"
import { Col, Container, Content, Header, Loader, Panel, Row } from "rsuite"
import { MyHeader } from "../../../components/Header"
import { MySidebar } from "../../../components/Sidebar"
import { ApiService } from "../../services/apiService"

export const Dashboard = () => {
    const apiService = new ApiService();
    const [countProducts, setCountProducts] = useState(0);
    const [countUsers, setCountUsers] = useState(0);
    const [countTransactions, setCountTransactions] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCount = async () => {
        const resProducts = await apiService.CountProduct();
        const resUsers = await apiService.CountUser();
        const resTransactioins = await apiService.CountHistory();
        setCountProducts(resProducts['data']);
        setCountUsers(resUsers['data']);
        setCountTransactions(resTransactioins['data']);
        setIsLoading(false);
    }

    useEffect(() => fetchCount(), [])

    return (
        <>
            <MySidebar />
            <Container
                style={{ padding: 12 }}>
                <MyHeader />
                {
                    isLoading ?
                        <Loader center backdrop size="lg" content="loading" />
                        :
                        <Content style={{ marginTop: "10vh" }}>
                            <Row style={{ display: "flex", justifyContent: "space-around" }} >
                                <Col md={6} sm={12}  >
                                    <Panel shaded style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "250px" }} >
                                        <Content style={{ textAlign: "center", fontSize: "50px", fontWeight: "bold", color: "#28b544" }} >{countProducts}</Content>
                                        <Content style={{ textAlign: "center", fontSize: "46px", fontWeight: "bold" }}>Products</Content>
                                    </Panel>
                                </Col>
                                <Col md={6} sm={12}>
                                    <Panel shaded style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "250px" }} >
                                        <Content style={{ textAlign: "center", fontSize: "50px", fontWeight: "bold", color: "#00AFFF" }} >{countUsers}</Content>
                                        <Content style={{ textAlign: "center", fontSize: "46px", fontWeight: "bold" }}>Users</Content>
                                    </Panel>
                                </Col>
                                <Col md={6} sm={12}>
                                    <Panel shaded style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "250px" }} >
                                        <Content style={{ textAlign: "center", fontSize: "50px", fontWeight: "bold", color: "#FF4368" }} >{countTransactions}</Content>
                                        <Content style={{ textAlign: "center", fontSize: "46px", fontWeight: "bold" }}>Transactions</Content>
                                    </Panel>
                                </Col>
                            </Row>
                        </Content>
                }
            </Container>
        </>
    )
}