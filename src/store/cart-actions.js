import { cartActions } from './cart.js'

export const fetchCartData = () => {
	return async dispatch => {
		const fetchData = async () => {
			const response = await fetch('https://practice-f07b4-default-rtdb.firebaseio.com/cart.json')
			if (!response.ok) {
				throw new Error('Could not fetch cart data!')
			}
			const data = await response.json()
			return data
		}
		try {
			const cartData = await fetchData()
			dispatch(cartActions.replaceCart(cartData))
		} catch (error) {
			dispatch(cartActions.showNotification({ status: 'error', title: 'Error', message: 'Fetching cart data failed!' }))
		}
	}
}

export const sendCartData = cart => {
	return async dispatch => {
		dispatch(cartActions.showNotification({ status: 'pending', title: 'Sending ...', message: 'Sending cart data!' }))
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
				cartActions.showNotification({
					status: 'success',
					title: 'Success',
					message: 'Send cart data successfully!',
				})
			)
		} catch (error) {
			sendCartData().catch(error => {
				dispatch(
					cartActions.showNotification({ status: 'error', title: 'Error', message: 'Sending cart data failed!' })
				)
			})
		}
	}
}
