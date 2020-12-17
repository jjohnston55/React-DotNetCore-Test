import React, { useEffect, useState } from 'react';

import ProductAPI from '../../api/products';
import CategoryAPI from '../../api/categories';

const CreateProduct = (props) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [active, setActive] = useState(false);

    const productAPI = new ProductAPI();
    const categoryAPI = new CategoryAPI();

    const submit = () => {
        if (!isNaN(parseFloat(cost)) && productName !== '' && description !== '') {
            const productCategories = selectedCategories.map((cat, idx) => {
                return (
                    {
                        'ProductName': productName,
                        'CategoryName': cat
                    }
                )
            });
            const product = {
                'ProductName': productName,
                'Description': description,
                'Cost': parseFloat(cost),
                'ProductCategories': productCategories,
                'Active': active
            };
            productAPI.AddProduct(product).then(data => {
                switch (data) {
                    case 201:
                        alert(`${product.ProductName} successfully added`);
                        break;
                    case 409:
                        alert(`${product.ProductName} already exists`);
                        break;
                    default:
                        break;
                }
            });
        }
    }

    const selected = (evt) => {
        let options = Array.from(evt.target.selectedOptions, option => option.value);
        setSelectedCategories(options);
    }

    useEffect(() => {
        categoryAPI.GetCategories().then(data => {
            setCategories(data);
        });
    }, []);

    return (
        <p>
            <span><b>Product Name: </b><input onChange={(evt) => setProductName(evt.target.value)} /></span><br/>
            <span><b>Description: </b><input onChange={(evt) => setDescription(evt.target.value)} /></span><br/>
            <span><b>Cost: </b><input onChange={(evt) => setCost(evt.target.value)} /></span><br/>
            <span><b>Is Active: </b><input type='checkbox' onChange={(evt) => setActive(evt.target.checked)} /></span><br/>
            <span><b>Categories: </b><select multiple onChange={(evt) => selected(evt)}>{
                categories.length > 0 &&
                categories.map((category, idx) => {
                    return (
                        <option key={idx} value={category.categoryName}>{category.categoryName}</option>
                    )
                })
            }</select></span><br/>
            <button onClick={submit}>Create</button>
        </p>
    )
}

export default CreateProduct;