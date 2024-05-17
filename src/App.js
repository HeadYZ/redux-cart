import { useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import { useEffect } from 'react'

function App() {
	const showCart = useSelector(state => state.cartReducer.cartIsVisible)
	const cart = useSelector(state => state.cartReducer)

	useEffect(() => {
		fetch('https://practice-f07b4-default-rtdb.firebaseio.com/cart.json', { method: 'PUT', body: JSON.stringify(cart) })
	}, [cart])
	return (
		<Layout>
			{showCart && <Cart />}
			<Products />
		</Layout>
	)
}

export default App
