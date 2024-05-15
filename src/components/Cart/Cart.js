import { useSelector } from 'react-redux'
import Card from '../UI/Card'
import classes from './Cart.module.css'
import CartItem from './CartItem'

const Cart = props => {
	const products = useSelector(state => state.cartReducer.products)
	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			<ul>
				{products.map(product => (
					<CartItem
						key={product.title}
						item={{
							title: product.title,
							quantity: product.quantity,
							total: product.totalPrice,
							price: product.price,
						}}
					/>
				))}
			</ul>
		</Card>
	)
}

export default Cart
