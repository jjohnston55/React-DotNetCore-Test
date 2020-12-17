import React, { useEffect, useState } from 'react';

import ProductAPI from '../../api/products';

const GetProduct = (props) => {
    const [product, setProduct] = useState();
    const [productName, setProductName] = useState('');

    const productAPI = new ProductAPI();

    useEffect(() => {
        if (productName.length > 0)
            productAPI.GetProduct(productName).then(data => {
                setProduct(data);
            })
    }, [productName]);

    return (
        <>
            <input onChange={(evt) => setProductName(evt.target.value)} placeholder="Enter Product Name" />
            <br/>
            {
                product && 
                <p>
                    <span><b>Product Name:</b> {product.productName}</span><br/>
                    <span><b>Description:</b> {product.description}</span><br/>
                    <span><b>Cost:</b> ${product.cost.toFixed(2)}</span><br/>
                    <span><b>Is Active:</b> {product.active ? 'Yes' : 'No'}</span><br/>
                    <span><b>Categories: </b> { product.productCategories.map((pc, idx) => {
                        return (
                            <>
                                <span key={idx}>{pc.categoryName}</span>
                                <br/>
                            </>
                        )
                    })}</span>
                </p>
            }
        </>
    )
}

export default GetProduct;