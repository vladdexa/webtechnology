import  {login,register,forgotPass}  from './authController'
import { getImagesForCarousels, getCategories,createStatistics } from './homeController'
import { getProduct,getProductsPicturesByCategory,addProductToShoppingCart} from './productCotroller'
import {getProductsForShoppingCart,deleteProductFromShoppingCart, placeYourOrder} from './orderController'
import {getProductsBySearchInput} from './searchProductsController'
import { getUserById} from './userController'
import {getProductsByCategoryId} from './categoryController'

export  {login,register,forgotPass,getImagesForCarousels,getProduct,getProductsPicturesByCategory,
        addProductToShoppingCart, getProductsForShoppingCart,deleteProductFromShoppingCart,
        getProductsBySearchInput,getUserById, getProductsByCategoryId,placeYourOrder, getCategories,createStatistics}
