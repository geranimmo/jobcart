import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import expect from 'expect';
import renderer from 'react-test-renderer';
import ConnectedCart from '../../src/components/cart';
import ListPackages from '../../src/assets/json/packages__.json';

describe('>>> C A R T ---- Test & Snapshot <<<', () => {
	const mockStore = configureMockStore([thunk]);
	let wrapper, store;

	const propCart = {
		ShoppingCart: [
			{
				id: 'Classic',
				buy_time: 1537425742947,
				package_id: "Classic",
				package_name: "Classic",
				package_recommend: false,
				package_description: "Classic Ad Lorem Ipsum is simply dummy text of the printing and typesetting",
				package_price: 269.99,
				package_image: "/assets/images/employeer-image-sample.jpg"
			}, {
				id: 'Premium',
				buy_time: 1537425742948,
				package_id: "Classic",
				package_name: "Classic",
				package_recommend: false,
				package_description: "Classic Ad Lorem Ipsum is simply dummy text of the printing and typesetting",
				package_price: 269.99,
				package_image: "/assets/images/employeer-image-sample.jpg"
			}
		],
		Profile: {
			client_id: 1,
			first_name: "Default",
			last_name: "Client",
			business_name: "Default",
			phone_number: "+612529291002",
			client_logo: "client-default-logo.png",
			client_special: []
		},
		UserLogin: true,
		Packages: ListPackages,
		id: 'shopping__cart__wrapper'
	};

	beforeEach(() => {
		store = mockStore(propCart);
		wrapper = mount(
			<Provider store={store}>
				<Router>
					<ConnectedCart {...propCart}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the ConnectedCart component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('+++ Contains props that assigned to the ConnectedCart component', () => {
		expect(wrapper.find(`main`).prop('id')).toEqual(propCart.id);
	});

	it('+++ Capturing Snapshot of ConnectedCart component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<ConnectedCart {...propCart}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});

	// it('+++ Should simulate click on delete cart item button +++', () => {
	// 	expect(wrapper.find('.cart__delete').length)
	// 		.toEqual(2);
	// 	console.log(wrapper.store().ShoppingCart);
	// 	wrapper
	// 		.find('div.cart__delete')
	// 		.at(0)
	// 		.simulate('click');

	// 	expect(wrapper.find('div.cart__delete').length)
	// 		.toEqual(1);

	// 	wrapper
	// 		.find('div.cart__delete')
	// 		.at(0)
	// 		.simulate('click');

	// 	expect(wrapper.find('div.cart__delete').length)
	// 		.toEqual(0);
	// });
});