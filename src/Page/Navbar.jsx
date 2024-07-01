/* eslint-disable react/jsx-key */
import { useState, useEffect, useContext } from "react";
import { Menu, Button, Drawer } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import style from "../style/Signup.module.css";
import { AuthContext } from "./AuthePrivder";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = isLoggedIn
    ? [
        {
          key: "logout",
          label: "Logout",
          icon: <LoginOutlined />,
          onClick: handleLogout,
        },
      ]
    : [
        { key: "home", label: "Home", icon: <HomeOutlined />, link: "/" },
        {
          key: "signin",
          label: "SignUp",
          icon: <UserOutlined />,
          link: "/signup",
        },
        {
          key: "login",
          label: "SignIn",
          icon: <LoginOutlined />,
          link: "/login",
        },
      ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className={style.navbar}>
      <div className="flex items-center rounded-md md:w-10 md:text-xl">
        <Button type="" xs={10} className="sm:w-36">
          <a href="/" className="sm:text-sm text-center">
            Google News
          </a>
        </Button>
      </div>

      {/* Menu horizontal pour les écrans larges */}
      <Menu
        mode="horizontal"
        className="hidden sm:flex justify-end rounded-md items-center h-10"
        style={{
          borderRadius: "10px",
          height: "35px",
        }}
      >
        {menuItems.map((item) =>
          item.onClick ? (
            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
              {item.label}
            </Menu.Item>
          ) : (
            <div className="sm:w-5 lg:w-40 md:w-8">
              <Menu.Item key={item.key} icon={item.icon}>
                <a href={item.link} style={{ color: "red" }}>
                  {item.label}
                </a>
              </Menu.Item>
            </div>
          )
        )}
      </Menu>

      {/* Menu hamburger pour les écrans petits */}
      <div className="sm:hidden">
        <Button type="text" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          key="right"
        >
          <Menu theme="light" mode="inline">
            {menuItems.map((item) =>
              item.onClick ? (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={item.onClick}
                >
                  {item.label}
                </Menu.Item>
              ) : (
                <Menu.Item key={item.key} icon={item.icon}>
                  <a href={item.link}>{item.label}</a>
                </Menu.Item>
              )
            )}
          </Menu>
        </Drawer>
      </div>
    </nav>
  );
}
