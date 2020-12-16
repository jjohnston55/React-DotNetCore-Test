import { Col, Collapse, Row } from 'antd';

import 'antd/dist/antd.css';
import './App.css';

const App = () => {
	return (
		<div className="App">
			<Row justify='space-around'>
				<Col span={10}>
					<Collapse>
						<Collapse.Panel header="List Products" key="1"></Collapse.Panel>
						<Collapse.Panel header="Get Product" key="2"></Collapse.Panel>
						<Collapse.Panel header="Create Product" key="3"></Collapse.Panel>
						<Collapse.Panel header="Update Product" key="4"></Collapse.Panel>
						<Collapse.Panel header="Delete Product" key="5"></Collapse.Panel>
					</Collapse>
				</Col>
				<Col span={10}>
					<Collapse>
						<Collapse.Panel header="List Categories" key="1"></Collapse.Panel>
						<Collapse.Panel header="Get Category" key="2"></Collapse.Panel>
						<Collapse.Panel header="Create Category" key="3"></Collapse.Panel>
						<Collapse.Panel header="Update Category" key="4"></Collapse.Panel>
						<Collapse.Panel header="Delete Category" key="5"></Collapse.Panel>
					</Collapse>
				</Col>
			</Row>
		</div>
  	);
}

export default App;
