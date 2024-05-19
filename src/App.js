import { useDispatch, useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products.jsx'
import Notification from './components/UI/Notification.jsx'
import { useEffect } from 'react'
import { fetchCartData, sendCartData } from './store/cart-actions.js'

let isInitial = true

function App() {
	const dispatch = useDispatch()
	const showCart = useSelector(state => state.cartReducer.cartIsVisible)
	const cart = useSelector(state => state.cartReducer.products)
	const notification = useSelector(state => state.cartReducer.notification)

	useEffect(() => {
		dispatch(fetchCartData())
	}, [dispatch])

	useEffect(() => {
		if (isInitial) {
			isInitial = false
			return
		}
		dispatch(sendCartData(cart))
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
