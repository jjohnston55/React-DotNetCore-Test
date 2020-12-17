import React, { useEffect, useState } from 'react';

import CategoryAPI from '../../api/categories';

const ListCategories = (props) => {
    const [categories, setCategories] = useState([]);

    const categoryAPI = new CategoryAPI();

    useEffect(() => {
        categoryAPI.GetCategories().then(data => {
            setCategories(data);
        });
    }, []);

    return (
        <>
            {
                categories.map((category, idx) => {
                    return (
                        <p key={idx}>
                            <span><b>Category Name:</b> {category.categoryName}</span><br/>
                            <span><b>Description:</b> {category.description}</span><br/>
                            <span><b>Is Active:</b> {category.active ? 'Yes' : 'No'}</span><br/>
                            <span><b>Products: </b> { category.productCategories.map((pc, idx) => {
                                return (
                                    <>
                                        <span key={idx}>{pc.productName}</span>
                                        <br/>
                                    </>
                                )
                            })}</span>
                        </p>
                )})
            }
        </>
    )
}

export default ListCategories;