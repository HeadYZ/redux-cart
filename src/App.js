import { useDispatch, useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products.jsx'
import Notification from './components/UI/Notification.jsx'
import { useEffect } from 'react'
import { cartActions } from './store/cart'

let isInitial = true

function App() {
	const dispatch = useDispatch()
	const showCart = useSelector(state => state.cartReducer.cartIsVisible)
	const cart = useSelector(state => state.cartReducer.products)
	const notification = useSelector(state => state.cartReducer.notification)

	useEffect(() => {
		const sendCartData = async () => {
			dispatch(cartActions.showNotification({ status: 'pending', title: 'Sending ...', message: 'Sending cart data!' }))
			const response = await fetch('https://practice-f07b4-default-rtdb.firebaseio.com/cart.json', {
				method: 'PUT',
				body: JSON.stringify(cart),
			})
			if (!response.ok) {
				throw new Error('Sending cart data failed!')
			}

			dispatch(
				cartActions.showNotification({ status: 'success', title: 'Success', message: 'Send cart data successfully!' })
			)
		}
		if (isInitial) {
			isInitial = false
			return
		}

		sendCartData().catch(error => {
			dispatch(cartActions.showNotification({ status: 'error', title: 'Error', message: 'Sending cart data failed!' }))
		})
	}, [cart, dispatch])
	return (
		<>
			{notification && (
				<Notification status={notification.status} title={notification.title} message={notification.message} />
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</>
	)
}

export default App
