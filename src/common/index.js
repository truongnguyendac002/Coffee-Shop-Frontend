
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
}

export default summaryApi;
