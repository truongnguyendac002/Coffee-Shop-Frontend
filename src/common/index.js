
const backendDomain = "http://localhost:8080/api";

const summaryApi = {
    signUP: {
        url: `${backendDomain}/auth/register`,
        method: "POST"
    },
    signIn: {
        url: `${backendDomain}/auth/login`,
        method: "POST"
    },
    logout_user: {
        url: `${backendDomain}/api/user-logout`,
        method: "GET"
    },
    current_user: {
        url: `${backendDomain}/auth/user-details`,
        method: "GET"
    },
    forgotPassword: {
        url: `${backendDomain}/forgotPassword/verifyEmail/`,
        method: "POST"
    },
    verifyOtp: {
        url: `${backendDomain}/forgotPassword/verifyOtp/`,
        method: "POST"
    },
    changePassword: {
        url: `${backendDomain}/forgotPassword/changePassword/`,
        method: "POST"
    },
    refreshToken: {
        url: `${backendDomain}/auth/refresh-token`,
        method: "POST"
    },
    allCategory: {
        url: `${backendDomain}/category/all`,
        method: "GET"
    },
    addCategory: {
        url: `${backendDomain}/category`,
        method: "POST"
    },
    allBrand: {
        url: `${backendDomain}/brand/all`,
        method: "GET"
    },
    addBrand: {
        url: `${backendDomain}/brand`,
        method: "POST"
    },
    allProduct: {
        url: `${backendDomain}/product/all`,
        method: "GET"
    },
    addProduct: {
        url: `${backendDomain}/product`,
        method: "POST"
    },
    updateProduct: {
        url: `${backendDomain}/product/`,
        method: "PUT"
    },
    deleteProduct: {
        url: `${backendDomain}/product/`,
        method: "DELETE"
    },
    updateCartItem: {
        url: `${backendDomain}/cart/item`,
        method: "PUT"
    },
    getAllCartItems: {
        url: `${backendDomain}/cart/user/`,
        method: "GET"
    },
    addCartitem: {
        url: `${backendDomain}/cart/item`,
        method: "POST"
    },
    deleteCartItem : {
        url: `${backendDomain}/cart/item/`,
        method: "DELETE"
    },
    getAddressByUser: {
        url: `${backendDomain}/address`,
        method: "GET"
    },
    addShippingAddress: {
        url: `${backendDomain}/address`,
        method: "POST"
    },
    updateShippingAddress: {
        url: `${backendDomain}/address`,
        method: "PUT"
    },
    deleteShippingAddress: {
        url: `${backendDomain}/address/`,
        method: "DELETE"
    },

    productDetails: {
        url: `${backendDomain}/product/`,
        method: "GET",
    },
    productItem: {
        url: `${backendDomain}/product-item/`,
        method: "GET",
    },
    addProductItem: {
        url: `${backendDomain}/product-item`,
        method: "POST",
    },
    updateProductItem: {
        url: `${backendDomain}/product-item/`,
        method: "PUT",
    },
    deleteProductItem: {
        url: `${backendDomain}/product-item/`,
        method: "DELETE",
    },

    createRefund: {
        url: `${backendDomain}/payment`,
        method: "POST",
    },

    createOnlinePayment: {
        url: `${backendDomain}/payment`,
        method: "GET",
    },

    addOrder: {
        url: `${backendDomain}/order`,
        method: "POST",
    },

    getProfile: {
        url: `${backendDomain}/profile`,
        method: "GET",
    },
    getAllUsers: {
        url: `${backendDomain}/user/all`,
        method: "GET",
    },
    processUser: {
        url: `${backendDomain}/user/`,
        method: "PUT",
    },
    searchProduct : {
        url : `${backendDomain}/product/search`,
        method : 'GET'
    },

    addFavorite : {
        url : `${backendDomain}/favorites`,
        method : "POST"
    },
    allFavorites : {
        url : `${backendDomain}/favorites/`,
        method : "GET"
    },
    deleteFavorites : {
        url : `${backendDomain}/favorites`,
        method : "DELETE"
    },
    addType : {
        url : `${backendDomain}/type-product`,
        method : "POST"
    },
    getAllType : {
        url : `${backendDomain}/type-product/all`,
        method : "GET"
    },
    addTransaction : {
        url : `${backendDomain}/transaction`,
        method : "POST"
    },
    getProductByCategory : {
        url : `${backendDomain}/product/category/`,
        method : "GET"
    },
    updateProfile : {
        url : `${backendDomain}/profile`,
        method : "PUT"
    },
    getReviewByProductId : {
        url : `${backendDomain}/review/`,
        method : "GET"
    }
}

export default summaryApi;
