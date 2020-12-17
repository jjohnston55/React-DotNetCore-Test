import React, { useEffect, useState } from 'react';

import ProductAPI from '../../api/products';

const DeleteProduct = (props) => {
    const [productName, setProductName] = useState('');
    const [product, setProduct] = useState();

    const productAPI = new ProductAPI();

    const submit = () => {
        if (productName !== '') {
            productAPI.DeleteProduct(productName).then(data => {
                switch (data) {
                    case 200:
                        alert(`${productName} successfully deleted`);
                        break;
                    case 404:
                        alert(`${productName} does not exist`);
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
                    setProduct(data);
            })
    }, [productName]);

    return (
        <>
            <span><b>Search Product Name: </b><input onChange={(evt) => setProductName(evt.target.value)} /></span><br/>
            <hr />
            {
                product &&
                <>
                <span><b>Description: </b>{product.description}</span><br/>
                <span><b>Cost: </b>${product.cost.toFixed(2)}</span><br/>
                <span><b>Is Active: </b><input type='checkbox' readOnly checked={product.active} /></span><br/>
                <button onClick={submit}>Delete</button>
                </>
            }
        </>
    )
}

export default DeleteProduct;