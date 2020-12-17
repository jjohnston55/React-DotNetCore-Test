import React, { useState } from 'react';

import ProductAPI from '../../api/products';

const CreateProduct = (props) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [active, setActive] = useState(false);

    const productAPI = new ProductAPI();

    const submit = () => {
        if (!isNaN(parseFloat(cost)) && productName != '' && description != '') {
            const product = {
                'ProductName': productName,
                'Description': description,
                'Cost': parseFloat(cost),
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

    return (
        <p>
            <span><b>Product Name: </b><input onChange={(evt) => setProductName(evt.target.value)} /></span><br/>
            <span><b>Description: </b><input onChange={(evt) => setDescription(evt.target.value)} /></span><br/>
            <span><b>Cost: </b><input onChange={(evt) => setCost(evt.target.value)} /></span><br/>
            <span><b>Is Active: </b><input type='checkbox' onChange={(evt) => setActive(evt.target.checked)} /></span><br/>
            <button onClick={submit}>Create</button>
        </p>
    )
}

export default CreateProduct;