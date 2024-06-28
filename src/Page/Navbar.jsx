/* eslint-disable react/jsx-key */
import { useState, useEffect, useContext } from "react";
import { Menu, Button, Modal } from "antd";
// import { useNavigate, NavLink } from "react-router-dom";
import { HomeOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import style from "../style/Signup.module.css";
import { AuthContext } from "./AuthePrivder";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useContext(AuthContext);
  // const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };

  const jwtLogout = () => {
    localStorage.removeItem("token");
    location.assign("/login");
  };
  const menuItems = isLoggedIn
    ? [
        {
          key: "logout",
          label: "Logout",
          icon: <LoginOutlined />,
          onClick: jwtLogout,
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

        {
          key: "login",
          label: "SignInTest",
          icon: <LoginOutlined />,
          link: "/loginTest",
        },
      ];

  return (
    <nav className={style.navbar}>
      <div className="flex items-center rounded-md md:w-10 md:text-xl">
        <Button type="" xs={10} className="sm:w-36">
          <a href="/" className="sm:text-sm text-center">
            Google News
          </a>
        </Button>
      </div>
      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          justifyContent: "end",
          borderRadius: "10px",
          alignItems: "center",
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
    </nav>
  );
}
