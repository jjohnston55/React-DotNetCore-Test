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
    return axios.post(`${API_ENDPOINT}/products/`, {
        'Product': product
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
}

ProductAPI.prototype.UpdateProduct = function(productName, product) {
    return axios.put(`${API_ENDPOINT}/products/${productName}`, {
        'Product': product
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
}

ProductAPI.prototype.DeleteProduct = function(productName) {
    return axios.put(`${API_ENDPOINT}/products/${productName}`).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
}

export default ProductAPI;