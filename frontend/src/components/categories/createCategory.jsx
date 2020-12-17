import React, { useState } from 'react';

import CategoryAPI from '../../api/categories';

const CreateCategory = (props) => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [active, setActive] = useState(false);

    const categoryAPI = new CategoryAPI();

    const submit = () => {
        if (categoryName !== '' && description !== '') {
            const category = {
                'CategoryName': categoryName,
                'Description': description,
                'Active': active
            };
            categoryAPI.AddCategory(category).then(data => {
                switch (data) {
                    case 201:
                        alert(`${category.CategoryName} successfully added`);
                        break;
                    case 409:
                        alert(`${category.CategoryName} already exists`);
                        break;
                    default:
                        break;
                }
            });
        }
    }

    return (
        <p>
            <span><b>Category Name: </b><input onChange={(evt) => setCategoryName(evt.target.value)} /></span><br/>
            <span><b>Description: </b><input onChange={(evt) => setDescription(evt.target.value)} /></span><br/>
            <span><b>Is Active: </b><input type='checkbox' onChange={(evt) => setActive(evt.target.checked)} /></span><br/>
            <button onClick={submit}>Create</button>
        </p>
    )
}

export default CreateCategory;