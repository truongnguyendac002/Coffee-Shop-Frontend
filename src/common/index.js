

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
    

}

export default summaryApi;