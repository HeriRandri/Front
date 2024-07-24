import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Menu, Card, Row, Col, Spin } from "antd";
import {
  HomeOutlined,
  LaptopOutlined,
  TrophyOutlined,
  GlobalOutlined,
  ExperimentOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import "../style/articles.module.css";

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      const res = await axios.get(`/articles?category=home`, {
        withCredentials: true,
        headers: { authorization: `Bearer ${token}` },
      });

      setArticles(res.data);
      setError(null);
      console.log(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    console.error(error);
    if (error.response && error.response.status === 401) {
      setError({ message: "Accès non autorisé. Veuillez vous reconnecter." });
    } else if (error.response && error.response.status === 500) {
      setError({ message: "Internal Server Error" });
    } else {
      setError({ message: "An unexpected error occurred" });
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const menuItems = [
    { key: "home", label: "Home", icon: <HomeOutlined />, link: "/articles" },
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
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <a href={item.link}>{item.label}</a>
            </Menu.Item>
          ))}
        </Menu>
      </nav>
      <div className="container mt-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="spin_container flex justify-center items-center h-80">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="error_container flex justify-center items-center h-80">
            <p className="text-red-800 text-3xl font-bold">{error.message}</p>
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
                      <h3 className="text-blue-400 font-bold">
                        {article.title}
                      </h3>
                      <p className="italic">{article.abstract}</p>
                    </div>
                    <div>
                      <p>
                        <em>{article.byline}</em>
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400"
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
