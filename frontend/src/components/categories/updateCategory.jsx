import React, { useEffect, useState } from "react";

import CategoryAPI from "../../api/categories";

const UpdateCategory = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);

  const categoryAPI = new CategoryAPI();

  const submit = () => {
    if (categoryName !== "" && description !== "") {
      const category = {
        CategoryName: categoryName,
        Description: description,
        Active: active,
      };
      categoryAPI.UpdateCategory(categoryName, category).then((data) => {
        switch (data) {
          case 204:
            alert(`${category.CategoryName} successfully updated`);
            break;
          case 404:
            alert(`${category.CategoryName} does not exists`);
            break;
          default:
            break;
        }
      });
    }
  };

  useEffect(() => {
    if (categoryName.length > 0)
      categoryAPI.GetCategory(categoryName).then((data) => {
        if (data !== undefined) {
          setDescription(data.description);
          setActive(data.active);
        } else {
          setDescription("");
          setActive(false);
        }
      });
  }, [categoryName]);

  return (
    <>
      <span>
        <b>Category Name: </b>
        <input onChange={(evt) => setCategoryName(evt.target.value)} />
      </span>
      <br />
      <hr />
      <span>
        <b>Description: </b>
        <input
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </span>
      <br />
      <span>
        <b>Is Active: </b>
        <input
          type="checkbox"
          checked={active}
          onChange={(evt) => setActive(evt.target.checked)}
        />
      </span>
      <br />
      <button onClick={submit}>Update</button>
    </>
  );
};

export default UpdateCategory;
