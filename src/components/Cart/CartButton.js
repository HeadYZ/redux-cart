import { useDispatch, useSelector } from 'react-redux'
import classes from './CartButton.module.css'
import { cartActions } from '../../store/cart'

const CartButton = props => {
	const dispatch = useDispatch()
	const amountOfProducts = useSelector(state => state.cartReducer.products)
	const toggleCartHandler = () => {
		dispatch(cartActions.toggle())
	}
	console.log(amountOfProducts)
	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{amountOfProducts.length}</span>
		</button>
	)
}

export default CartButton
