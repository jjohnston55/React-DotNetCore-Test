import React, { useEffect, useState } from 'react';

import ProductAPI from '../../api/products';

const ListProducts = (props) => {
    const [products, setProducts] = useState([]);

    const productAPI = new ProductAPI();

    useEffect(() => {
        productAPI.GetProducts().then(data => {
            setProducts(data);
        });
    }, []);

    return (
        <>
            {
                products.map((product, idx) => {
                    return (
                        <p key={idx}>
                            <span><b>Product Name:</b> {product.productName}</span><br/>
                            <span><b>Description:</b> {product.description}</span><br/>
                            <span><b>Cost:</b> ${product.cost.toFixed(2)}</span><br/>
                            <span><b>Is Active:</b> {product.active ? 'Yes' : 'No'}</span><br/>
                        </p>
                    )
                })
            }
        </>
    )
}

export default ListProducts;