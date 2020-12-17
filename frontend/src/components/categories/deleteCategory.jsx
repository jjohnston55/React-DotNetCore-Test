import React, { useEffect, useState } from 'react';

import CategoryAPI from '../../api/categories';

const DeleteCategory = (props) => {
    const [categoryName, setCategoryName] = useState('');
    const [category, setCategory] = useState();

    const categoryAPI = new CategoryAPI();

    const submit = () => {
        if (categoryName !== '') {
            categoryAPI.DeleteCategory(categoryName).then(data => {
                switch (data) {
                    case 200:
                        alert(`${categoryName} successfully deleted`);
                        break;
                    case 404:
                        alert(`${categoryName} does not exists`);
                        break;
                    default:
                        break;
                }
            });
        }
    }

    useEffect(() => {
        if (categoryName.length > 0)
            categoryAPI.GetCategory(categoryName).then(data => {
                setCategory(data);
            });
    }, [categoryName]);

    return (
        <>
            <span><b>Category Name: </b><input onChange={(evt) => setCategoryName(evt.target.value)} /></span><br/>
            <hr />
            {
                category &&
                <>
                    <span><b>Description: </b>{category.description}</span><br/>
                    <span><b>Is Active: </b><input type='checkbox' readOnly checked={category.active}/></span><br/>
                    <span><b>Products: </b> { category.productCategories.map((pc, idx) => {
                        return (
                            <>
                                <span key={idx}>{pc.productName}</span>
                                <br/>
                            </>
                        )
                    })}</span><br/>
                    <button onClick={submit}>Delete</button>
                </>
            }
        </>
    )
}

export default DeleteCategory;