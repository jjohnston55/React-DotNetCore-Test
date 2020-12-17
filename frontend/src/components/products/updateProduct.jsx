import React, { useEffect, useState } from 'react';

import ProductAPI from '../../api/products';

const UpdateProduct = (props) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [active, setActive] = useState(false);

    const productAPI = new ProductAPI();

    const submit = () => {
        if (!isNaN(parseFloat(cost)) && productName !== '' && description !== '') {
            const product = {
                'ProductName': productName,
                'Description': description,
                'Cost': parseFloat(cost),
                'Active': active
            };
            productAPI.UpdateProduct(productName, product).then(data => {
                switch (data) {
                    case 204:
                        alert(`${product.ProductName} successfully updated`);
                        break;
                    case 404:
                        alert(`${product.ProductName} does not exist`);
                        break;
                    default:
                        break;
                }
            });
        }
    }

    useEffect(() => {
        if (productName.length > 0)
            productAPI.GetProduct(productName).then(data => {
                if (data !== undefined) {
                    setDescription(data.description);
                    setActive(data.active);
                    setCost(data.cost);
                }
            })
    }, [productName]);

    return (
        <>
            <span><b>Search Product Name: </b><input onChange={(evt) => setProductName(evt.target.value)} /></span><br/>
            <hr />
            <span><b>Description: </b><input value={description} onChange={(evt) => setDescription(evt.target.value)} /></span><br/>
            <span><b>Cost: </b>$<input value={cost} onChange={(evt) => setCost(evt.target.value)} /></span><br/>
            <span><b>Is Active: </b><input type='checkbox' checked={active} onChange={(evt) => setActive(evt.target.checked)} /></span><br/>
            <button onClick={submit}>Update</button>
        </>
    )
}

export default UpdateProduct;