import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, message } from "antd";
import { removeFromFavorites } from "../../store/favoritesSlice ";
import fetchWithAuth from "../../helps/fetchWithAuth";
import summaryApi from "../../common";
import image1 from "../../assets/img/img1.jpg";
import { useNavigate } from "react-router-dom";


const { Title, Text } = Typography;
const Wishlist = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favorites = useSelector((state) => state.favorites.items);

    const user = useSelector((store) => store?.user?.user);
    const handleRemoveFavorite = async (product) => {
        try {
            const response = await fetchWithAuth(summaryApi.deleteFavorites.url, {
                method: summaryApi.deleteFavorites.method,
                body: JSON.stringify({
                    UserId: user.id,
                    ProductId: product.id
                }),
            });

            const data = await response.json();
            if (data.respCode === "000") {
                dispatch(removeFromFavorites(product));

                message.success("Sản phẩm đã được xóa khỏi danh sách yêu thích");
            } else {
                throw new Error("Lỗi khi xóa sản phẩm khỏi danh sách yêu thích");
            }
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm khỏi danh sách yêu thích:", error);
            message.error("Không thể xóa sản phẩm khỏi danh sách yêu thích");
        }
    };

    const handleViewItem = (product) => {
        navigate(`/product/${product.id}`);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <Title level={3}>Wish List</Title>
            <div className="mt-4 space-y-4">
                {favorites.length === 0 ? (
                    <Text>Danh sách yêu thích trống.</Text>
                ) : (
                    favorites.map((item) => (
                        <div
                            key={item.product.id}
                            className="p-4 bg-gray-100 rounded-lg flex items-center"
                            onClick={() => handleViewItem(item.product)}
                        >
                            <img
                                className="w-16 h-16 bg-white rounded-lg object-cover"
                                src={item.product.default_image ? item.product.default_image : image1}
                                alt={item.product.name}
                            />
                            <div className="ml-4">
                                <Text className="block mb-4">{item.product.name}</Text>
                                <div>
                                    <Text className="text-xl font-semibold">
                                        ${item.product.price}
                                    </Text>

                                    <Button
                                        className="ml-4"
                                        type="primary"
                                        danger
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFavorite(item.product);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;
