import  {login,register,forgotPass}  from './authController'
import { getImagesForCarousels, searchByInputValue} from './homeController'
import { getProduct,getProductsPicturesByCategory,addProductToShoppingCart} from './productCotroller'
import {getProductsForShoppingCart,deleteProductFromShoppingCart} from './orderController'
import {getProductsBySearchInput} from './searchProductsController'

export  {login,register,forgotPass,getImagesForCarousels,getProduct,getProductsPicturesByCategory,
        addProductToShoppingCart, getProductsForShoppingCart,deleteProductFromShoppingCart,searchByInputValue,getProductsBySearchInput}