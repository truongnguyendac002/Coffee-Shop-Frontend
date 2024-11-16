import React, { useEffect, useState } from "react";
import { Avatar, Typography, List, Button, Spin } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  FiHome,
  FiMail,
  FiHeart,
  FiGift,
  FiAlertCircle,
  FiPhone,
} from "react-icons/fi";
import { TbInfoSquare } from "react-icons/tb";
import fetchWithAuth from "../helps/fetchWithAuth";
import summaryApi from "../common";

const { Title, Text } = Typography;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("personalInfo");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetchWithAuth(summaryApi.getProfile.url, {
        method: summaryApi.getProfile.method,
      });
      const profileRespData = await response.json();
      if (profileRespData.respCode === "000") {
        return profileRespData.data;
      } else {
        console.log(profileRespData);
        return null;
      }
    };

    const loadProfileData = async () => {
      setLoading(true);
      try {
        const profileResponse = await fetchProfile();
        if (profileResponse) {
          setProfileData(profileResponse);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  if (loading || !profileData) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
      <>
        <div className="flex justify-center h-screen mt-3">
          <Spin indicator={antIcon} />
        </div>
      </>
    );
  } 

  // Nội dung hiển thị theo menu
  const renderContent = () => {
    switch (selectedMenu) {
      case "personalInfo":
        return (
          <div>
            {/* Right Content */}
            <section className="lg:col-span-3 space-y-6">
              {/* Account Info */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Title level={3}>Account info</Title>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-gray-100 rounded-lg flex items-center">
                    <FiMail className="mr-4 text-xl" />
                    <div>
                      <Text className="block">Email Address</Text>
                      <Text>{profileData.email}</Text>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg flex items-center">
                    <FiPhone className="mr-4 text-xl" />
                    <div>
                      <Text className="block">Phone number</Text>
                      <Text>{profileData.phone}</Text>
                    </div>
                  </div>

                </div>
              </div>

              {/* Lists */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Title level={3}>Lists</Title>
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                    <div>
                      <Text className="block">Coffee Beans - Espresso Arabica and Robusta Beans</Text>
                      <Text className="text-lg font-semibold">$47.00</Text>
                    </div>
                    <Button type="primary">Add to cart</Button>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                    <div>
                      <Text className="block">Lavazza Coffee Blends - Try the Italian Espresso</Text>
                      <Text className="text-lg font-semibold">$53.00</Text>
                    </div>
                    <Button type="primary">Add to cart</Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      case "addresses":
        return (
          <div>
            <Title level={3}>Addresses</Title>
            <p>Here you can manage your addresses.</p>
          </div>
        );
      case "communications":
        return (
          <div>
            <Title level={3}>Communications & Privacy</Title>
            <p>Adjust your communication preferences here.</p>
          </div>
        );
      case "reorder":
        return (
          <div>
            <Title level={3}>Reorder</Title>
            <p>View and reorder your favorite items.</p>
          </div>
        );
      case "lists":
        return (
          <div>
            <Title level={3}>Lists</Title>
            <p>Manage your wish lists here.</p>
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
        <section className="text-center mb-8">
          <Avatar
            size={100}
            src="./assets/img/avatar/avatar-3.png"
            icon={<UserOutlined />}
          />
          <Title level={4} className="mt-4">
            {profileData.name}
          </Title>
          <Text type="secondary">Registered: {profileData.created_at}</Text>
        </section>

        <Title level={5}>Manage Account</Title>
        <List
          itemLayout="horizontal"
          dataSource={[
            { key: "personalInfo", title: "Personal info", icon: <UserOutlined className="text-2xl" /> },
            { key: "addresses", title: "Addresses", icon: <FiHome className="text-2xl" /> },
            { key: "communications", title: "Communications & privacy", icon: <FiMail className="text-2xl" /> },
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

        <Title level={5}>My Orders</Title>
        <List
          itemLayout="horizontal"
          dataSource={[
            { key: "reorder", title: "Reorder", icon: <FiHeart className="text-2xl" /> },
            { key: "lists", title: "Lists", icon: <FiGift className="text-2xl" /> },
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
    </div>
  );
};

export default Profile;
