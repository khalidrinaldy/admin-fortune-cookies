import { forwardRef, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Button, ButtonToolbar, Container, Content, Form, Input, InputPicker, Loader, Schema } from "rsuite"
import { MyHeader } from "../../../components/Header"
import { ModalComponent } from "../../../components/Modal";
import { MySidebar } from "../../../components/Sidebar"
import { ApiService } from "../../services/apiService";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    product_name: StringType()
        .isRequired('This field is required.'),
    product_price: NumberType()
        .isRequired('This field is required.'),
    product_category: StringType()
        .isRequired('This field is required.'),
    product_image: StringType()
        .isRequired('This field is required.'),
    product_description: StringType()
        .isRequired('This field is required.'),
});

const TextField = forwardRef((props, ref) => {
    const { name, label, accepter, ...rest } = props;
    return (
        <Form.Group controlId={`${name}-4`} ref={ref}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest} style={{ width: "500px" }} />
        </Form.Group>
    );
});

const TextAreaField = forwardRef((props, ref) => {
    const { name, label, accepter, ...rest } = props;
    return (
        <Form.Group controlId={`${name}-4`}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Input name={name} as="textarea" accepter={accepter} {...rest} />
        </Form.Group>
    );
});

export const NewProductView = () => {
    const apiService = new ApiService();
    const navigate = useNavigate();
    const formRef = useRef();
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        product_name: '',
        product_price: 0,
    });
    const [productImage, setProductImage] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [categoryPick, setCategoryPick] = useState(null);
    const [messageDialog, setMessageDialog] = useState({
        title: '',
        content: '',
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);
    const categoryData = [
        {
            "label": "Cookies",
            "value": "cookies",
        },
        {
            "label": "Cake",
            "value": "cake",
        },
        {
            "label": "Bread",
            "value": "bread",
        },
        {
            "label": "Chocolates",
            "value": "chocolates",
        },
    ];

    const handleSubmit = async () => {
        console.log(productDescription);
        if (formValue.product_name != '' && categoryPick != null && productImage != '' && productDescription != '') {
            setLoading(true);
            const admin = JSON.parse(localStorage.getItem('user'));
            const res = await apiService.AddProduct({
                product_name: formValue.product_name,
                product_category: categoryPick,
                product_price: formValue.product_price,
                product_image: productImage,
                product_description: productDescription,
                token: admin['token']
            });
            setLoading(false);
            if (res['error']) {
                setMessageDialog({
                    title: res['message'],
                    content: res['data']
                });
                setOpenDialog(true);
            } else {
                setMessageDialog({
                    title: "Success",
                    content: `Add new ${categoryPick} success !`
                });
                setOpenDialog(true);
            }
        } else {
            setMessageDialog({
                title: "Warning !",
                content: "Please complete the form"
            });
            setOpenDialog(true);
        }
    }

    return (
        <>
            <MySidebar />
            <Container
                style={{ padding: 12 }}>
                <MyHeader />
                <Content>
                    <Content style={{ fontWeight: "bold", fontSize: "30px", textAlign: "center", marginTop: "5vh", }}>
                        Add New Product
                    </Content>
                    <Content style={{
                        width: "80vh",
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
                            fluid
                        >
                            <TextField name="product_name" label="Product Name" />
                            <TextField name="product_price" label="Product Price" />
                            <TextField name="product_category" label="Product Category" accepter={InputPicker} value={categoryPick} onChange={setCategoryPick} size="md" data={categoryData} style={{ width: 224, marginBottom: "20px" }} />
                            <TextAreaField name="product_image" label="Product Image [URL]" value={productImage} onChange={setProductImage} />
                            <TextAreaField name="product_description" label="Product Description" value={productDescription} onChange={setProductDescription} />

                            <ButtonToolbar>
                                <Button color="green" appearance="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </ButtonToolbar>
                        </Form>
                    </Content>
                </Content>
                <ModalComponent open={openDialog} onClose={handleClose} title={messageDialog.title} content={messageDialog.content} >

                </ModalComponent>
                {
                    loading ?
                        <Loader center backdrop size="lg" content="loading" /> :
                        <></>
                }
            </Container>
        </>
    )
}