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

CategoryAPI.prototype.AddCategory = function(category) {
    return axios.post(`${API_ENDPOINT}/categories/`, category).then(data => {
        return data.status;
    }).catch(err => {
        console.error(err);
        return 409;
    });
}

CategoryAPI.prototype.UpdateCategory = function(categoryName, category) {
    return axios.put(`${API_ENDPOINT}/categories/${categoryName}`, category).then(data => {
        return data.status;
    }).catch(err => {
        console.error(err);
        return 404;
    });
}

CategoryAPI.prototype.DeleteCategory = function(categoryName) {
    return axios.delete(`${API_ENDPOINT}/categories/${categoryName}`).then(data => {
        return data.status;
    }).catch(err => {
        console.error(err);
        return 404;
    });
}

export default CategoryAPI;