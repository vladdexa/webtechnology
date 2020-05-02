import  {login,register,forgotPass}  from './authController'
import { getImagesForCarousels } from './homeController'
import { getProduct,getProductsPicturesByCategory,addProductToShoppingCart} from './productCotroller'
import {getProductsForShoppingCart,deleteProductFromShoppingCart} from './orderController'

export  {login,register,forgotPass,getImagesForCarousels,getProduct,getProductsPicturesByCategory,addProductToShoppingCart, getProductsForShoppingCart,deleteProductFromShoppingCart}