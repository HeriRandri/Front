import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Modal, Menu, Card, Row, Col, Button, Spin, Form, Input } from "antd";
import {
  HomeOutlined,
  LaptopOutlined,
  TrophyOutlined,
  GlobalOutlined,
  ExperimentOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import style from "../style/Signup.module.css";

export default function World() {
  const [articles, setArticles] = useState([]);
  const [showUpgrade, setShowUpgrade] = useState(false);
  // const [selectCategory, setSelectCategory] = useState("world");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dollar, setDollar] = useState(false);
  const [form] = Form.useForm();
  const fetchArticles = async (category) => {
    // const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.get(`/articles?category=${category}`, {
        withCredentials: true,
        // headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data);
      setError(null);
    } catch (error) {
      setError(error);
      if (error.response && error.response.status === 401) {
        Modal.error({
          content: "Accès non autorisé. Veuillez vous reconnecter.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    // const token = localStorage.getItem("token");
    setDollar(true);
    setShowUpgrade(false);
    try {
      const res = await axios.post(
        "/devenir-admin",
        {},
        { withCredentials: true }
        // {
        //   headers: { authorization: `Bearer ${token}` },
        // }
      );
      console.log(res.data);
      setShowUpgrade(false);
    } catch (error) {
      // Modal.error({
      //   content: "Upgrade failed. Please try again.",
      // });
    }
  };
  const isRole = async () => {
    // const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "/userL",
        { withCredentials: true },
        {
          // headers: { authorization: `Bearer ${token}` },
        }
      );
      setRole(res.data.role[0]);
      console.log(res.data.role[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isRole();
  });

  const handleClickMenu = async (e) => {
    alert("test world");
    const category = e.key;

    // setSelectCategory(category);

    if (category === "world" && role === "user") {
      setShowUpgrade(true);
    } else {
      setError(null);
      setShowUpgrade(false);
      console.log("deja admi");
      console.log(category);
      await fetchArticles(category);
    }
  };
  const payment = async (value) => {
    try {
      const response = await axios.post("/payment", value, {
        withCredentials: true,
      });

      console.log(response.data);
      fetchArticles("world");
      Modal.success({ content: "Payment Reussir" });
      form.resetFields();
    } catch (error) {
      Modal.error({ content: "Payment Failed" });
    }
  };

  const menuItems = [
    { key: "home", label: "Home", icon: <HomeOutlined />, link: "/home" },
    {
      key: "technology",
      label: "Technology",
      icon: <LaptopOutlined />,
      link: "/technology",
    },
    { key: "sport", label: "Sport", icon: <TrophyOutlined />, link: "/sport" },
    { key: "world", label: "World", icon: <GlobalOutlined />, link: "/world" },
    {
      key: "science",
      label: "Science",
      icon: <ExperimentOutlined />,
      link: "/science",
    },
    {
      key: "health",
      label: "Health",
      icon: <HeartOutlined />,
      link: "/health",
    },
  ];

  return (
    <div>
      <nav className="mt-10 max-w-7xl mx-auto shadow-lg border-b-2 rounded-lg h-10">
        <Menu
          mode="horizontal"
          style={{ display: "flex", justifyContent: "center" }}
          onClick={handleClickMenu}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <NavLink to={item.link}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </nav>
      {showUpgrade && (
        <Modal
          title="UPGRADE YOUR PLAN"
          visible={showUpgrade}
          onOk={handleUpgrade}
          onCancel={() => setShowUpgrade(false)}
          width={900}
        >
          <Row gutter={[16, 16]} justify="space-around">
            <Col key="vip" xs={24} sm={12} md={8} lg={6}>
              <Card
                className={style.card_upgrade}
                cover={
                  <div className="text-center mt-2">
                    <p className="">Free</p>
                    <h2>USD $0/Month</h2>
                  </div>
                }
              >
                <Button
                  type="primary"
                  onClick={handleUpgrade}
                  className="w-ful sm:w-auto lg:w-auto"
                >
                  Upgrade to VIP
                </Button>
                <p className="mt-2x">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas praesentium corporis odio numquam expedita quidem rem
                  laborum ipsam, dolorum in at! Voluptates, iste dignissimos.
                  Cum hic totam dolorum ex iste!
                </p>
              </Card>
            </Col>
            <Col key="vip" xs={24} sm={12} md={8} lg={6}>
              <Card
                className={style.card_upgrade}
                cover={
                  <div className="text-center mt-2">
                    <p className="">Plus</p>
                    <h2>USD $20/Month</h2>
                  </div>
                }
              >
                <Button
                  type="primary"
                  onClick={handleUpgrade}
                  className="w-full sm:w-auto"
                >
                  Upgrade to VIP
                </Button>
                <p className="mt-2x">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas praesentium corporis odio numquam expedita quidem rem
                  laborum ipsam, dolorum in at! Voluptates, iste dignissimos.
                  Cum hic totam dolorum ex iste!
                </p>
              </Card>
            </Col>
            <Col key="vip" xs={24} sm={12} md={8} lg={6}>
              <Card
                className={style.card_upgrade}
                cover={
                  <div className="text-center mt-2">
                    <p className="">VIP PLUS</p>
                    <h2>USD $25/Month</h2>
                  </div>
                }
              >
                <Button
                  type="primary"
                  onClick={handleUpgrade}
                  className="w-full sm:w-auto"
                >
                  Upgrade to VIP
                </Button>
                <p className="mt-2x">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas praesentium corporis odio numquam expedita quidem rem
                  laborum ipsam, dolorum in at! Voluptates, iste dignissimos.
                  Cum hic totam dolorum ex iste!
                </p>
              </Card>
            </Col>
          </Row>
        </Modal>
      )}

      {dollar && (
        <Modal
          title="UPGRADE YOUR PLAN"
          visible={dollar}
          onCancel={() => setDollar(false)}
          onOk={() => {
            setDollar(false);
          }}
        >
          <Form onFinish={payment} className="m-5 " form={form}>
            <Form.Item
              name="name"
              label="name"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input className="border-t-0" placeholder="username" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              className="flex flex-row items-center mb-4"
              labelAlign="left"
              rules={[
                { required: true, message: "Please enter your email address" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tel"
              label="Telephone"
              className="flex flex-row items-center mb-4"
              labelAlign="left"
              rules={[
                { required: true, message: "Please enter your email address" },
                {
                  type: "tel",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
      <div className="container mt-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="spin_container flex justify-center items-center h-80">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="error_container flex justify-center items-center h-80">
            <p className="text-red-800 text-3xl font-bold                                  ">
              {error.message}
            </p>
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {articles.map((article, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    article.multimedia && article.multimedia.length > 0 ? (
                      <img
                        alt={article.multimedia[0].caption}
                        src={article.multimedia[0].url}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    ) : null
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <div>
                      <h3>{article.title}</h3>
                      <p>{article.abstract}</p>
                    </div>
                    <div>
                      <p>
                        <em>{article.byline}</em>
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lire plus
                      </a>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
