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
}

export default summaryApi;