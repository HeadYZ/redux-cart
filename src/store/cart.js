import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: { cartIsVisible: false, notification: null, products: [] },
	reducers: {
		toggle(state) {
			state.cartIsVisible = !state.cartIsVisible
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			}
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

export const sendCartData = cart => {
	return async dispatch => {
		dispatch(
			cartSlice.actions.showNotification({ status: 'pending', title: 'Sending ...', message: 'Sending cart data!' })
		)
		const sendRequest = async () => {
			const response = await fetch('https://practice-f07b4-default-rtdb.firebaseio.com/cart.json', {
				method: 'PUT',
				body: JSON.stringify(cart),
			})
			if (!response.ok) {
				throw new Error('Sending cart data failed!')
			}
		}
		try {
			await sendRequest()
			dispatch(
				cartSlice.actions.showNotification({
					status: 'success',
					title: 'Success',
					message: 'Send cart data successfully!',
				})
			)
		} catch (error) {
			sendCartData().catch(error => {
				dispatch(
					cartSlice.actions.showNotification({ status: 'error', title: 'Error', message: 'Sending cart data failed!' })
				)
			})
		}
	}
}

export const cartActions = cartSlice.actions
export default cartSlice.reducer
