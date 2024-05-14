import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart.js'

const store = configureStore({ reducer: cartSlice.reducer })

export default store
