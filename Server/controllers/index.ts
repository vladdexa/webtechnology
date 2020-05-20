import {forgotPass, login, register} from './authController'
import {createStatistics, getCategories, getImagesForCarousels} from './homeController'
import {addProductToShoppingCart, createProduct, getProduct, getProductsPicturesByCategory} from './productCotroller'
import {deleteProductFromShoppingCart, getProductsForShoppingCart, placeYourOrder} from './orderController'
import {getProductsBySearchInput} from './searchProductsController'
import {getUserById} from './userController'
import {createCategory, getProductsByCategoryId} from './categoryController'
import {generateRssFeed} from "./rssController";

export {
    login,
    register,
    forgotPass,
    getImagesForCarousels,
    getProduct,
    getProductsPicturesByCategory,
    addProductToShoppingCart,
    getProductsForShoppingCart,
    deleteProductFromShoppingCart,
    getProductsBySearchInput,
    getUserById,
    getProductsByCategoryId,
    placeYourOrder,
    getCategories,
    createCategory,
    createProduct,
    generateRssFeed,
    createStatistics
}
