import axios from 'axios';
import { API_ENDPOINT } from '../constants';

const ProductCategoryAPI = function(attrs) {
    if (attrs) {
        Object.assign(this, attrs);
    }
};

ProductCategoryAPI.prototype.GetProductCategories = function() {
    return axios.get(`${API_ENDPOINT}/productcategories`).then(response => {
        return response.data;
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
};

ProductCategoryAPI.prototype.GetCategoriesByProduct = function(productName) {
    return axios.get(`${API_ENDPOINT}/productcategories/product/${productName}`).then(response => {
        return response.data;
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
}

ProductCategoryAPI.prototype.GetProductCategory = function(categoryName, productName) {
    return axios.get(`${API_ENDPOINT}/productcategories/${categoryName}/${productName}`).then(response => {
        return response.data;
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
};

ProductCategoryAPI.prototype.AddProductCategory = function(productCategory) {
    return axios.post(`${API_ENDPOINT}/productcategories`, {
        'ProductCategory': productCategory
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
}

ProductCategoryAPI.prototype.DeleteProductCategory = function(categoryName, productName) {
    return axios.put(`${API_ENDPOINT}/productcategories/${categoryName}/${productName}`).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
}

export default ProductCategoryAPI;