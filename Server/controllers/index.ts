import  {login,register,forgotPass}  from './authController'
import { getImagesForCarousels } from './homeController'
import { getProduct,getProductsPicturesByCategory,addProductToShoppingCart} from './productCotroller'
import {getProductsForShoppingCart,deleteProductFromShoppingCart} from './orderController'
import { getUserById} from './userController'

export  {login,register,forgotPass,getImagesForCarousels,getProduct,getProductsPicturesByCategory,getUserById,addProductToShoppingCart, getProductsForShoppingCart, deleteProductFromShoppingCart}
