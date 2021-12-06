import axios from "axios"

const API_URL = "https://fortune-cookies-apiserver.herokuapp.com"

export class ApiService {
    //ADMIN
    async login(email, password) {
        const data = { email: email, password: password }
        const res = await axios
            .post(API_URL + `/admin/login?email=${data.email}&password=${data.password}`, data, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
        return res.data
    }
    async register(email, password) {
        const data = { email: email, password: password }
        const res = await axios
            .post(API_URL + `/admin/register?email=${data.email}&password=${data.password}`, data, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
        return res.data;
    }
    async getUser() {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data != null) {
            const res = await axios.get(API_URL + `/adminbytoken`, {
                headers: { "Authorization": `Bearer ${data["token"]}` }
            })
            return res.data
        }
        return data
    }

    //PRODUCTS
    async GetProduct({type}) {
        const res = await axios.get(API_URL + `/product/${type}`)
        return res.data
    }
    async AddProduct({ product_name, product_category, product_price, product_image, product_description,token }) {
        const data = {
            product_name: product_name,
            product_category: product_category,
            product_price: product_price,
            product_image: product_image,
            product_description: product_description
        }
        const res = await axios.post(
            API_URL + 
            `/product?product_name=${data.product_name}&product_category=${data.product_category}&product_price=${data.product_price}&product_image=${data.product_image}&product_description=${data.product_description}`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    }
    async EditProduct({product_id, product_name, product_category, product_price, product_image, product_description,token}) {
        const res = await axios.put(
            API_URL + 
            `/product/edit/${product_id}`,
            `product_name=${product_name}&product_category=${product_category}&product_price=${product_price}&product_image=${product_image}&product_description=${product_description}`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${token}`
                }
            }
            );
        return res.data;
    }
    async deleteProduct({ product_id, token }) {
        const res = await axios.delete(API_URL + `/product/delete/${product_id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
        })
        return res.data
    }

    //COUNT
    async CountUser() {
        const res = await axios.get(`${API_URL}/user/count`);
        return res.data;
    }
    async CountProduct() {
        const res = await axios.get(`${API_URL}/product/count`);
        return res.data;
    }
    async CountHistory() {
        const res = await axios.get(`${API_URL}/history/count`);
        return res.data;
    }
}