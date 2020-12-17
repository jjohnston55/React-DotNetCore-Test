import { Col, Collapse, Row } from 'antd';

import GetProduct from './components/products/getProduct';
import ListProducts from './components/products/listProducts';
import CreateProduct from './components/products/createProduct';
import UpdateProduct from './components/products/updateProduct';

import GetCategory from './components/categories/getCategory';
import ListCategories from './components/categories/listCategories';
import CreateCategory from './components/categories/createCategory';
import UpdateCategory from './components/categories/updateCategory';

import 'antd/dist/antd.css';
import './App.css';

const App = () => {
	return (
		<div className="App">
			<Row justify='space-around'>
				<Col span={10}>
					<Collapse accordion>
						<Collapse.Panel header="List Products" key="1">
							<ListProducts />
						</Collapse.Panel>
						<Collapse.Panel header="Get Product" key="2">
							<GetProduct />
						</Collapse.Panel>
						<Collapse.Panel header="Create Product" key="3">
							<CreateProduct />
						</Collapse.Panel>
						<Collapse.Panel header="Update Product" key="4">
							<UpdateProduct />
						</Collapse.Panel>
						<Collapse.Panel header="Delete Product" key="5"></Collapse.Panel>
					</Collapse>
				</Col>
				<Col span={10}>
					<Collapse accordion>
						<Collapse.Panel header="List Categories" key="1">
							<ListCategories />
						</Collapse.Panel>
						<Collapse.Panel header="Get Category" key="2">
							<GetCategory />
						</Collapse.Panel>
						<Collapse.Panel header="Create Category" key="3">
							<CreateCategory />
						</Collapse.Panel>
						<Collapse.Panel header="Update Category" key="4">
							<UpdateCategory />
						</Collapse.Panel>
						<Collapse.Panel header="Delete Category" key="5"></Collapse.Panel>
					</Collapse>
				</Col>
			</Row>
		</div>
  	);
}

export default App;
