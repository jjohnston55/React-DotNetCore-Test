import React, { useEffect, useState } from "react";

import ProductAPI from "../../api/products";
import CategoryAPI from "../../api/categories";

const UpdateProduct = (props) => {
	const [categories, setCategories] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [productName, setProductName] = useState("");
	const [hiddenProductName, setHiddenProductName] = useState("");
	const [description, setDescription] = useState("");
	const [cost, setCost] = useState("");
	const [active, setActive] = useState(false);

	const productAPI = new ProductAPI();
	const categoryAPI = new CategoryAPI();

	const submit = () => {
		if (
			!isNaN(parseFloat(cost)) &&
			productName !== "" &&
			description !== ""
		) {
			const productCategories = selectedCategories.map((cat) => {
				return {
					ProductName: hiddenProductName,
					CategoryName: cat,
				};
			});
			const product = {
				ProductName: hiddenProductName,
				Description: description,
				Cost: parseFloat(cost),
				Active: active,
				ProductCategories: productCategories,
			};
			console.log(product);
			productAPI
				.UpdateProduct(hiddenProductName, product)
				.then((data) => {
					switch (data) {
						case 204:
							alert(
								`${product.ProductName} successfully updated`
							);
							break;
						case 404:
							alert(`${product.ProductName} does not exist`);
							break;
						default:
							break;
					}
				});
		}
	};

	const selected = (evt) => {
		let options = Array.from(
			evt.target.selectedOptions,
			(option) => option.value
		);
		setSelectedCategories(options);
	};

	useEffect(() => {
		categoryAPI.GetCategories().then((data) => {
			setCategories(data);
		});
	}, []);

	useEffect(() => {
		if (productName.length > 0)
			productAPI.GetProduct(productName).then((data) => {
				if (data !== undefined) {
					setHiddenProductName(data.productName);
					setDescription(data.description);
					setActive(data.active);
					setCost(data.cost);
					setSelectedCategories(
						data.productCategories.map((pc) => pc.categoryName)
					);
				} else {
					setDescription("");
					setActive(false);
					setCost("");
				}
			});
	}, [productName]);

	return (
		<>
			<span>
				<b>Search Product Name: </b>
				<input onChange={(evt) => setProductName(evt.target.value)} />
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
				<b>Cost: </b>$
				<input
					value={cost}
					onChange={(evt) => setCost(evt.target.value)}
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
			<span>
				<b>Categories: </b>
				<select multiple onChange={(evt) => selected(evt)}>
					{categories.length > 0 &&
						categories.map((category, idx) => {
							let selected = false;
							if (
								selectedCategories.includes(
									category.categoryName
								)
							) {
								selected = true;
							}
							return (
								<option
									key={idx}
									selected={selected}
									value={category.categoryName}
								>
									{category.categoryName}
								</option>
							);
						})}
				</select>
			</span>
			<br />
			<button onClick={submit}>Update</button>
		</>
	);
};

export default UpdateProduct;
