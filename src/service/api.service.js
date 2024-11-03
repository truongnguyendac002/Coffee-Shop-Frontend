import customFetch  from "./fetch.customize"
const getAccountAPI = () => {
    const URL = "/auth"
    return customFetch(
        URL,
        {
            method: "GET",
        }
    )
}

const logoutAPI = () => {
    const URL = "/auth/logout"
    return customFetch(
        URL,
        {
            method: "GET",
        }
    )
}
export { getAccountAPI, logoutAPI }