import axios from 'axios';
import { API_ENDPOINT } from '../constants';

const ProductAPI = function(attrs) {
    if (attrs) {
        Object.assign(this, attrs);
    }
};

ProductAPI.prototype.GetProducts = function() {
    return axios.get(`${API_ENDPOINT}/products`).then(response => {
        return response.data;
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
};

ProductAPI.prototype.GetProduct = function(productName) {
    return axios.get(`${API_ENDPOINT}/products/${productName}`).then(response => {
        return response.data;
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
};

ProductAPI.prototype.AddProduct = function(product) {
    console.log(product);
    return axios.post(`${API_ENDPOINT}/products/`, product).then(data => {
        return data.status;
    }).catch(err => {
        console.error(err);
        return 409;
    });
}

ProductAPI.prototype.UpdateProduct = function(productName, product) {
    return axios.put(`${API_ENDPOINT}/products/${productName}`, product).then(data => {
        return data.status;
    }).catch(err => {
        console.error(err);
        return 404;
    });
}

ProductAPI.prototype.DeleteProduct = function(productName) {
    return axios.delete(`${API_ENDPOINT}/products/${productName}`).then(data => {
        return data.status;
    }).catch(err => {
        console.error(err);
        return 404;
    });
}

export default ProductAPI;