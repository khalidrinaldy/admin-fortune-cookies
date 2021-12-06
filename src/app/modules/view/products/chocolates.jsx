import { useEffect, useState } from "react";
import { Button, Container, Content, Loader, Pagination } from "rsuite"
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import { Dialog } from "../../../components/Dialog";
import { MyHeader } from "../../../components/Header"
import { MySidebar } from "../../../components/Sidebar";
import { Product } from "../../../data/model/Product.model";
import { ApiService } from "../../services/apiService"

export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT';
    return (
        <Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <input
                    className="rs-input"
                    defaultValue={rowData[dataKey]}
                    onChange={event => {
                        onChange && onChange(rowData.id, dataKey, event.target.value);
                    }}
                />
            ) : (
                <span className="table-content-edit-span">{rowData[dataKey]}</span>
            )}
        </Cell>
    );
};

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
        <Cell {...props} style={{ padding: '6px' }}>
            <Button
                appearance="link"
                onClick={() => {
                    onClick && onClick(rowData.id);
                }}
            >
                {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
            </Button>
        </Cell>
    );
};

const DeleteCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
        <Cell {...props} style={{ padding: '6px' }}>
            <Button
                appearance="link"
                onClick={() => {
                    onClick && onClick(rowData.id);
                }}
            >
                Delete
            </Button>
        </Cell>
    );
};

export const ChocolatesView = () => {
    const category = "chocolates";
    const apiService = new ApiService();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [idToDelete, setIdToDelete] = useState();

    const getProducts = async () => {
        const res = await apiService.GetProduct({ type: category });
        const data = res['data'];
        let dumps = [];
        for (const index in data) {
            let product = new Product(
                data[index]["ID"],
                data[index]["product_name"],
                data[index]["product_price"],
                data[index]["product_image"],
                data[index]["product_category"],
                data[index]["product_description"],
            );
            dumps.push(product);
        }
        dumps = dumps.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        })
        setProductList(dumps);
    }

    useEffect(() => {
        getProducts();
    }, [])

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleChange = async (id, key, value) => {
        const nextData = Object.assign([], productList);
        nextData.find(item => item.id === id)[key] = value;
        setProductList(nextData);
    };

    const handleEditState = async id => {
        console.log(id);
        const nextData = Object.assign([], productList);
        const activeItem = nextData.find(item => item.id === id);
        activeItem.status = activeItem.status ? null : 'EDIT';

        if (activeItem.status != 'EDIT') {
            setLoading(true);
            const admin = JSON.parse(localStorage.getItem('user'));
            const res = await apiService.EditProduct({
                product_id: activeItem.id,
                product_name: activeItem.product_name,
                product_category: activeItem.product_category,
                product_price: activeItem.product_price,
                product_image: activeItem.product_image,
                product_description: activeItem.product_description,
                token: admin['token']
            });
        }
        setProductList(nextData);
        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        
        //API
        const admin = JSON.parse(localStorage.getItem('user'));
        const res = await apiService.deleteProduct({product_id: idToDelete, token: admin['token']})

        let nextData = Object.assign([], productList);
        const activeItem = nextData.find(item => item.id === idToDelete);
        nextData = nextData.filter(e => e !== activeItem);
        setProductList(nextData);
        setLoading(false);
        setOpenDialog(false);
    }

    return (
        <>
            <MySidebar />
            <Container style={{ padding: 12 }}>
                <MyHeader />
                <Content>
                    <Table height={600} data={productList} loading={loading} wordWrap>
                        <Column width={50} align="center" fixed>
                            <HeaderCell>Id</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={150} fixed>
                            <HeaderCell>Product Name</HeaderCell>
                            <EditCell dataKey="product_name" onChange={handleChange} />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>Product Price</HeaderCell>
                            <EditCell dataKey="product_price" onChange={handleChange} />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>Product Category</HeaderCell>
                            <Cell dataKey="product_category" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>Product Image</HeaderCell>
                            <EditCell dataKey="product_image" onChange={handleChange} />
                            {/* <img src={productList[rowIndex]} style={{
                                width: "10%",
                                height: "135px",
                                border: "1px solid black",
                                marginRight: "20px",
                            }} /> */}
                        </Column>

                        <Column width={200} flexGrow={1}>
                            <HeaderCell>Product Description</HeaderCell>
                            <EditCell dataKey="product_description" onChange={handleChange} />
                        </Column>

                        <Column>
                            <HeaderCell>Edit</HeaderCell>
                            <ActionCell dataKey="id" onClick={handleEditState} />
                        </Column>

                        <Column>
                            <HeaderCell>Delete</HeaderCell>
                            <DeleteCell dataKey="id" onClick={(id) => {
                                setIdToDelete(id);
                                setOpenDialog(true);
                            }} />
                        </Column>
                    </Table>
                    <div style={{ padding: 20 }}>
                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={5}
                            size="xs"
                            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                            total={productList.length}
                            limitOptions={[10, 20]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={handleChangeLimit}
                        />
                    </div>
                </Content>
            </Container>
            {
                loading ?
                    <Loader center backdrop size="lg" content="loading" /> :
                    <></>
            }
            <Dialog 
                open={openDialog} 
                onClose={()=>setOpenDialog(false)} 
                onAction={handleDelete} 
                title={"Warning !"}
                content={"Are you sure want to delete ?"} />
        </>
    )
}