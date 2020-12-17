import React, { useEffect, useState } from 'react';

import CategoryAPI from '../../api/categories';

const GetCategory = (props) => {
    const [category, setCategory] = useState();
    const [categoryName, setCategoryName] = useState('');

    const categoryAPI = new CategoryAPI();

    useEffect(() => {
        if (categoryName.length > 0)
            categoryAPI.GetCategory(categoryName).then(data => {
                setCategory(data);
            });
    }, [categoryName]);

    return (
        <>
            <input onChange={(evt) => setCategoryName(evt.target.value)} placeholder="Enter Category Name" />
            <br/>
            {
                category && 
                <p>
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
            }
        </>
    )
}

export default GetCategory;