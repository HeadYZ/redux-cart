import { useSelector } from 'react-redux'
import classes from './CartButton.module.css'

const CartButton = props => {
	const amountOfProducts = useSelector(state => state.products)

	return (
		<button className={classes.button}>
			<span>My Cart</span>
			<span className={classes.badge}>{amountOfProducts.length}</span>
		</button>
	)
}

export default CartButton
