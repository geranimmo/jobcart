import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import expect from "expect";
import Slider from 'react-slick';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ConnectedHome, { Home } from '../../src/components/home';
import reducers from '../../src/components/reducers';
import ListPackages from '../../src/assets/json/packages__.json';
import ListTestimonials from '../../src/assets/json/testimonials__.json';

describe('>>> H O M E ---- Test & Snapshot <<<', () => {
	let store, mountWrapper;

	const propHome = {
		ShoppingCart: [
			{ id: 'Classic', buy_time: 1537425742947 },
			{ id: 'Premium', buy_time: 1537425742948 }
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
		Testimonials: ListTestimonials,
		id: 'home__page__wrapper'
	};

	beforeEach(() => {
		store = createStore(reducers, {}, applyMiddleware(thunk));
		mountWrapper = mount(
			<Provider store={store}>
				<Router>
					<ConnectedHome {...propHome}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the Home component +++', () => {
		const finder = mountWrapper.find('div.main__container');
		expect(finder.length).toEqual(1);
		
		// total sliders in home should be 3
		const sliders = finder.find(Slider);
		expect(sliders.length).toEqual(3);
	});

	it('+++ Initialize componentDidMount() if not login route to Login +++', () => {
		const history = { push: jest.fn() };
		const shallWrapper = shallow(
			<Home
				history={history}
				UserLogin={false}
			/>
		);

		shallWrapper.update();
		expect(history.push).toHaveBeenCalledWith('/');
	});

	it('+++ Initialize componentDidMount() if login route to Home +++', () => {
		const getListPackage = jest.fn();
		const getListTestimonial = jest.fn();
		const shallWrapper = shallow(
			<Home
				getListPackage={getListPackage}
				getListTestimonial={getListTestimonial}
				UserLogin={true}
			/>
		);

		shallWrapper.update();
		expect(getListPackage).toHaveBeenCalled();
	});

	it('+++ Capturing Snapshot of Home component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<ConnectedHome {...propHome}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});