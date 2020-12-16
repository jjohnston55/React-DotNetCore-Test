import axios from 'axios';
import { API_ENDPOINT } from '../constants';

const CategoryAPI = function(attrs) {
    if (attrs) {
        Object.assign(this, attrs);
    }
};

CategoryAPI.prototype.GetCategories = function() {
    return axios.get(`${API_ENDPOINT}/categories`).then(response => {
        return response.data;
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
};

CategoryAPI.prototype.GetCategory = function(categoryName) {
    return axios.get(`${API_ENDPOINT}/categories/${categoryName}`).then(response => {
        return response.data;
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
};

CategoryAPI.prototype.Addcategory = function(category) {
    return axios.post(`${API_ENDPOINT}/categories/`, {
        'Category': category
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
}

CategoryAPI.prototype.Updatecategory = function(categoryName, category) {
    return axios.put(`${API_ENDPOINT}/categories/${categoryName}`, {
        'Category': category
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
}

CategoryAPI.prototype.Deletecategory = function(categoryName) {
    return axios.put(`${API_ENDPOINT}/categories/${categoryName}`).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.error(err);
    });
}

export default CategoryAPI;