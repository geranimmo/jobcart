import { DISPATCH_TOTAL_DISCOUNT } from './types';

export const getTotalDiscount = () => {
	return (dispatch, getState) => {
		const { ShoppingCart, Profile } = getState();
		const ClientSpecial = Profile.client_special;
		let totalDiscount = 0;
	
		for ( let i = 0; i < ClientSpecial.length; i++ ) {
			let currentDiscount;
			const getInCartPromoItems = filterPromoById(ClientSpecial[i].package_id, ShoppingCart);
			
			if ( ClientSpecial[i].types === 'free__items' ) {
				if (getInCartPromoItems.length) {
					let pricePerItem = getInCartPromoItems[0].package_price;
					let getTotalFreeItems = Math.floor(getInCartPromoItems.length / ClientSpecial[i].minimum_items);
					currentDiscount = parseFloat((getTotalFreeItems * pricePerItem).toFixed(2));
					totalDiscount = totalDiscount + currentDiscount;
				}
			} else if (getInCartPromoItems.length >= ClientSpecial[i].minimum_items) {
				let discountPrice = ClientSpecial[i].discount_price;
				currentDiscount = parseFloat((discountPrice * getInCartPromoItems.length).toFixed(2));
				totalDiscount = totalDiscount + currentDiscount;
			}
		}
        
		dispatch({
			type: DISPATCH_TOTAL_DISCOUNT,
			payload: totalDiscount
		});
	};
};

export const filterPromoById = (id, datas) => {
	return datas.filter(obj => obj.package_id === id);
};