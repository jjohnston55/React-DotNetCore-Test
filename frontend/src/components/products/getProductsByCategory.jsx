import React, { useEffect, useState } from 'react';

import ProductAPI from '../../api/products';
import CategoryAPI from '../../api/categories';

const GetProductsByCategory = (props) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	const productAPI = new ProductAPI();
	const categoryAPI = new CategoryAPI();

	const select = (idx) => {
		if (idx !== 0) {
			productAPI.GetProductsByCategory(categories[idx - 1].categoryName).then(data => {
				setProducts(data);
			});
		}
	}

	useEffect(() => {
		categoryAPI.GetCategories().then(data => {
			setCategories(data);
		});
	}, []);

	return (
		<>
			<select onChange={(evt) => select(evt.target.options.selectedIndex)} >
				<option value='-1'>Select a Category</option>
				{
					categories.length > 0 &&
					categories.map((category, idx) => {
						return (
							<option key={idx} value={category.categoryName}>{category.categoryName}</option>
						)
					})
				}
			</select>
			<hr />
			{
				products &&
				products.map((product, idx) => {
					return (
						<p key={idx}>
							<span><b>Product Name:</b> {product.productName}</span><br/>
							<span><b>Description:</b> {product.description}</span><br/>
							<span><b>Cost:</b> ${product.cost.toFixed(2)}</span><br/>
							<span><b>Is Active:</b> {product.active ? 'Yes' : 'No'}</span><br/>
							{/* <span><b>Categories: </b> { product.productCategories.map((pc, idx) => {
								return (
									<>
										<span key={idx}>{pc.categoryName}</span>
										<br/>
									</>
								)
							})}</span> */}
						</p>
					)
				})
			}
		</>
	)
}

export default GetProductsByCategory;