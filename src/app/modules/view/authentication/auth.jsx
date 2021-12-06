import { forwardRef, useEffect, useRef, useState } from "react";
import { Button, ButtonToolbar, Container, Content, Form, Header, Loader, Modal, Schema } from "rsuite"
import { ApiService } from "../../services/apiService";
import { ModalComponent } from "../../../components/Modal";
import { useNavigate } from "react-router";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),
    password: StringType()
        .isRequired('This field is required.')
        .minLength(8, "At least 8 characters or more")
});

const TextField = forwardRef((props, ref) => {
    const { name, label, accepter, ...rest } = props;
    return (
        <Form.Group controlId={`${name}-4`} ref={ref}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest} />
        </Form.Group>
    );
});

export const AuthView = () => {
    const apiService = new ApiService();
    const navigate = useNavigate();
    const formRef = useRef();
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const [messageDialog, setMessageDialog] = useState({
        title: '',
        content: '',
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const checkIsLogged = async () => {
        const res = await apiService.getUser();
        if (res != null) {
            navigate("/");
            window.location.reload();
        }
    }

    const handleLogin = async () => {
        if (!formRef.current.check()) {
            return;
        }
        setLoading(true);
        const res = await apiService.login(formValue.email, formValue.password)
        if (res['error']) {
            setMessageDialog({
                title: "Login Failed",
                content: res['message']
            });
            setLoading(false);
            handleOpen();
        } else {
            localStorage.setItem("user", JSON.stringify({
                "token": res["data"]["token"]
            }));
            setLoading(false);
            navigate("/");
            window.location.reload();
        }
    }

    const handleRegister = async () => {
        if (!formRef.current.check()) {
            return;
        }
        setLoading(true);
        const res = await apiService.register(formValue.email, formValue.password)
        if (res['error']) {
            setMessageDialog({
                title: "Register Failed",
                content: res['message']
            });
            setLoading(false);
            handleOpen();
        } else {
            setMessageDialog({
                title: res['message'],
                content: "You can login now"
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        checkIsLogged();
    }, []);

    return (
        <Container>
            <Header style={{ fontWeight: "bold", fontSize: "26px", textAlign: "center", marginTop: "15vh", }}>
                Welcome to Fortune Cookies Admin Page
            </Header>
            <Content style={{
                height: "300px",
                marginTop: "5vh",
                borderRadius: "20px",
                flex: "none",
                boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.25)",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px"
            }}>
                <Form
                    ref={formRef}
                    onChange={setFormValue}
                    onCheck={setFormError}
                    formValue={formValue}
                    model={model}
                >
                    <TextField name="email" label="Email" />
                    <TextField name="password" label="Password" type="password" autoComplete="off" />

                    <ButtonToolbar>
                        <Button appearance="primary" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button appearance="primary" onClick={handleRegister}>
                            Register
                        </Button>
                    </ButtonToolbar>
                </Form>
            </Content>
            <ModalComponent open={openDialog} onClose={handleClose} title={messageDialog.title} content={messageDialog.content} >

            </ModalComponent>
            {
                loading ? 
                <Loader center backdrop size="lg" content="loading" /> :
                <></>
            }
        </Container>
    )
}