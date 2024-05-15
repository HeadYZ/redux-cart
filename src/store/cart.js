import { createSlice, current } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: { cartIsVisible: false, products: [] },
	reducers: {
		toggle(state) {
			state.cartIsVisible = !state.cartIsVisible
		},
		addItemToCart(state, action) {
			const existingItem = state.products.find(product => product.title === action.payload.title)

			if (!existingItem) {
				state.products.push({
					title: action.payload.title,
					price: action.payload.price,
					quantity: 1,
					totalPrice: action.payload.price,
				})
			}
			if (existingItem) {
				existingItem.quantity++
				existingItem.totalPrice += action.payload.price
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload
			const existingItem = state.products.find(product => product.title === id)
			if (existingItem.quantity === 1) {
				state.products = state.products.filter(product => product.title !== id)
			} else {
				existingItem.quantity--
				existingItem.totalPrice -= existingItem.price
			}
		},
	},
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer
