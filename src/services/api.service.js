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

const getCartAPI = (userId) => {
    const URL = "/cart/user/" + userId;
    return customFetch(
        URL,
        {
            method: "GET",
        }
    )
}

const updateCartItemAPI = (item) => {
    const URL = "/cart/item";
    return customFetch(
        URL,
        {
            method: "PUT",
            body: JSON.stringify(
                {
                    Quantity: item.quantity,
                    ProductItemId: item.productItem.id,
                    UserId: item.user.id
                }
            ),
        }
    )
}

export { getAccountAPI, logoutAPI, getCartAPI, updateCartItemAPI }