import  {login,register,forgotPass}  from './authController'
import { getImagesForCarousels, getCategories } from './homeController'
import { getProduct,getProductsPicturesByCategory,addProductToShoppingCart, createProduct} from './productCotroller'
import {getProductsForShoppingCart,deleteProductFromShoppingCart, placeYourOrder} from './orderController'
import {getProductsBySearchInput} from './searchProductsController'
import { getUserById} from './userController'
import {getProductsByCategoryId,createCategory} from './categoryController'
import {generateRssFeed} from "./rssController";

export  {login,register,forgotPass,getImagesForCarousels,getProduct,getProductsPicturesByCategory,
        addProductToShoppingCart, getProductsForShoppingCart,deleteProductFromShoppingCart,getProductsBySearchInput,getUserById, getProductsByCategoryId,placeYourOrder, getCategories, createCategory, createProduct, generateRssFeed}
