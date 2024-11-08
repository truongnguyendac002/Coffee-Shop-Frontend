
const backendDomain ="http://localhost:8080/api" ;

const summaryApi = { 
    signUP : {
        url : `${backendDomain}/auth/register`,
        method : "POST"
    },
    signIn  : {
        url : `${backendDomain}/auth/login`,
        method : "POST"
    },
    logout_user : {
        url : `${backendDomain}/api/user-logout`,
        method : "GET"
    },
    current_user :{
        url : `${backendDomain}/auth/user-details`,
        method : "GET"
    },
    forgotPassword : {
        url: `${backendDomain}/forgotPassword/verifyEmail/`,
        method: "POST"
    },
    verifyOtp : {
        url: `${backendDomain}/forgotPassword/verifyOtp/`,
        method: "POST"
    },
    changePassword : {
        url: `${backendDomain}/forgotPassword/changePassword/`,
        method: "POST"
    },
    refreshToken : {
        url : `${backendDomain}/auth/refresh-token`,
        method : "POST"
    },
    allCategory : {
        url : `${backendDomain}/category/all-category`,
        method : "GET"
    },
    allProduct : {
        url : `${backendDomain}/product/all-product`,
        method : "GET"
    },
    updateCartItem : {
        url : `${backendDomain}/cart/item`,
        method : "PUT"
    },
    
    

}

export default summaryApi;