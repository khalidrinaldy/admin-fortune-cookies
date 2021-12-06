import { Container, Content, Header } from "rsuite";
import AdminIcon from '@rsuite/icons/Admin';
import { useEffect, useState } from "react";
import { ApiService } from "../modules/services/apiService";

export const MyHeader = () => {
    const apiService = new ApiService();
    const [user, setUser] = useState({
        email: ''
    });

    const getUser = async() => {
        const res = await apiService.getUser();
        const data = res['data'];
        setUser({
            email: data['email']
        });
    }

    useEffect(() => getUser(),[]);

    return (
        <Header style={{
            display: "flex",
            justifyContent: "flex-end"
        }}>
            <div style={{
                minWidth: "200px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <p>Hi {user.email}</p>
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#f7f7fa",
                        borderRadius: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "15px"
                    }}
                >
                    <AdminIcon width={50} height={50} />
                </div>
            </div>
        </Header>
    )
}