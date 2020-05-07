import  {login,register,forgotPass}  from './authController'
import { getImagesForCarousels } from './homeController'
import { getProduct,getProductsPicturesByCategory,addProductToShoppingCart} from './productCotroller'
import {getProductsForShoppingCart,deleteProductFromShoppingCart, placeYourOrder} from './orderController'
import {getProductsBySearchInput} from './searchProductsController'
import { getUserById} from './userController'

export  {login,register,forgotPass,getImagesForCarousels,getProduct,getProductsPicturesByCategory,
        addProductToShoppingCart, getProductsForShoppingCart,deleteProductFromShoppingCart,getProductsBySearchInput,getUserById, placeYourOrder}
