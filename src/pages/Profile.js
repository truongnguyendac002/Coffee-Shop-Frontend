import React, { useEffect, useState } from "react";
import { Typography, List, Spin, Button } from "antd";
import { UserOutlined, LoadingOutlined, EditOutlined } from "@ant-design/icons";
import {
  FiHome,
  FiMail,
  FiGift,
  FiAlertCircle,
  FiPhone,
  FiKey,
  FiUser,
} from "react-icons/fi";
import { TbInfoSquare } from "react-icons/tb";
import fetchWithAuth from "../helps/fetchWithAuth";
import summaryApi from "../common";
import Wishlist from "../components/profile/wishlist";
import Address from "../components/profile/address";
import Info from "../components/profile/InforProfile";
import OrderHistory from "../components/profile/orderHistory";
import ProfileSection from "../components/profile/ProfileSection";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";

const { Title, Text } = Typography;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("personalInfo");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  console.log("user dispatch", user);
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const response = await fetchWithAuth(summaryApi.getProfile.url, {
  //       method: summaryApi.getProfile.method,
  //     });
  //     const profileRespData = await response.json();
  //     if (profileRespData.respCode === "000") {
  //       return profileRespData.data;
  //     } else {
  //       console.log(profileRespData);
  //       return null;
  //     }
  //   };

  //   const loadProfileData = async () => {
  //     setLoading(true);
  //     try {
  //       const profileResponse = await fetchProfile();
  //       if (profileResponse) {
  //         dispatch(setUser(profileResponse));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadProfileData();
  // }, [dispatch]);

  if (loading || !user) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
      <>
        <div className="flex justify-center h-screen mt-3">
          <Spin indicator={antIcon} />
        </div>
      </>
    );
  }

  const showEditInfoModal = () => {
    setIsModalVisible(true);
  };

  const handleSave = async (updatedData) => {
    const fetchUpdateProfile = async (data) => {
      const response = await fetchWithAuth(summaryApi.updateProfile.url, {
        method: summaryApi.updateProfile.method,
        body: JSON.stringify({
          Name: data.name,
          Phone: data.phone,
          Password: data.password,
          ConfirmPassword: data.confirmPassword,
        }),
      });
      const updateRespData = await response.json();
      if (updateRespData.respCode === "000") {
        return updateRespData.data;
      } else {
        console.log("Loi fetchUpdateProfile:", updateRespData);
        return null;
      }
    }

    const respData = await fetchUpdateProfile(updatedData);

    if (respData) {
      console.log("respData", respData);
      dispatch(setUser(respData));
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };


  const renderContent = () => {
    switch (selectedMenu) {
      case "personalInfo":
        return (
          <div>
            {/* Right Content */}
            <section className="lg:col-span-3 space-y-6">
              {/* Account Info */}
              <div className="bg-white p-6  rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <Title level={3}>Account info</Title>
                  <Button type="link" icon={<EditOutlined />} className="text-gray-500"
                    onClick={() => showEditInfoModal()}
                  >
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gray-100 rounded-lg flex items-center">
                    <FiUser className="mr-4 text-xl" />
                    <div>
                      <Text className="block">Name</Text>
                      <Text>{user.name}</Text>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg flex items-center">
                    <FiMail className="mr-4 text-xl" />
                    <div>
                      <Text className="block">Email Address</Text>
                      <Text>{user.email}</Text>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg flex items-center">
                    <FiPhone className="mr-4 text-xl" />
                    <div>
                      <Text className="block">Phone number</Text>
                      <Text>{user.phone}</Text>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-100 rounded-lg flex items-center">
                    <FiKey className="mr-4 text-xl" />
                    <div>
                      <Text className="block">Password</Text>
                      <Text>•••••••••••••••••••••</Text>
                    </div>
                  </div>

                </div>
              </div>

              {/* Lists */}
              <Wishlist />
            </section>
          </div>
        );
      case "addresses":
        return (
          <>
            <Address />
          </>
        );
      case "communications":
        return (
          <div>
            <Title level={3}>Communications & Privacy</Title>
            <p>Adjust your communication preferences here.</p>
          </div>
        );
      case "orderHistory":
        return (
          <div>
            <OrderHistory />
          </div>
        );

      case "help":
        return (
          <div>
            <Title level={3}>Help</Title>
            <p>Contact our support team for assistance.</p>
          </div>
        );
      case "terms":
        return (
          <div>
            <Title level={3}>Terms of Use</Title>
            <p>Read the terms of use for our services.</p>
          </div>
        );
      default:
        return <div>Content not found.</div>;
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
        <ProfileSection  />
        <Title level={5}>Manage Account</Title>
        <List
          itemLayout="horizontal"
          dataSource={[
            { key: "personalInfo", title: "Personal info", icon: <UserOutlined className="text-2xl " /> },
            { key: "addresses", title: "Addresses", icon: <FiHome className="text-2xl " /> },
            { key: "communications", title: "Communications & privacy", icon: <FiMail className="text-2xl " /> },
          ]}
          renderItem={(item) => (
            <List.Item
              onClick={() => setSelectedMenu(item.key)}
              className={`cursor-pointer my-2 p-2 rounded-lg transition-all duration-300 ${selectedMenu === item.key ? "bg-gray-200" : "bg-white"}`}
            >
              <List.Item.Meta avatar={<div className="pl-2">{item.icon}</div>} title={item.title} />
            </List.Item>
          )}
          className="mb-6"
        />

        <Title level={5}>My Orders</Title>
        <List
          itemLayout="horizontal"
          dataSource={[
            { key: "orderHistory", title: "Order History", icon: <FiGift className="text-2xl" /> },
          ]}
          renderItem={(item) => (
            <List.Item
              onClick={() => setSelectedMenu(item.key)}
              className={`cursor-pointer p-2 rounded-lg transition-all duration-300 ${selectedMenu === item.key ? "bg-gray-200" : "bg-white"}`}
            >
              <List.Item.Meta avatar={<div className="pl-2">{item.icon}</div>} title={item.title} />

            </List.Item>
          )}
          className="mb-6"
        />

        <Title level={5}>Customer Service</Title>
        <List
          itemLayout="horizontal"
          dataSource={[
            { key: "help", title: "Help", icon: <TbInfoSquare className="text-2xl" /> },
            { key: "terms", title: "Terms of Use", icon: <FiAlertCircle className="text-2xl" /> },
          ]}
          renderItem={(item) => (
            <List.Item
              onClick={() => setSelectedMenu(item.key)}
              className={`cursor-pointer p-2 rounded-lg transition-all duration-300 ${selectedMenu === item.key ? "bg-gray-200" : "bg-white"}`}
            >
              <List.Item.Meta avatar={<div className="pl-2">{item.icon}</div>} title={item.title} />
            </List.Item>
          )}
        />
      </aside>


      {/* Right Content */}
      <section className="lg:col-span-3 space-y-6  pl-6 rounded-lg">
        {renderContent()}
      </section>
      <Info
        visible={isModalVisible}
        data={user}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default Profile;
