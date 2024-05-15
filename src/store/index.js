import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart.js'

const store = configureStore({ reducer: { cartReducer: cartSlice } })

export default store
