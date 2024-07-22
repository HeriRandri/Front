import { Button, Form, Input, Modal, Spin, Anchor } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthePrivder";
// import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  axios.defaults.baseURL = "https://backfichier.onrender.com";

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  // const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const { login } = useContext(AuthContext);

  const handleLogin = async (values) => {
    setLoading(true);
    setLoad(true);
    try {
      // const response = await axios.post("/login", values, {
      //   withCredentials: true,
      // });
      // if (response.data.auth) {
      //   localStorage.setItem("token", response.data.jsonwebtoken);
      //   console.log(response.data.jsonwebtoken);
      //   Modal.success({ content: "Login suuccessfully" });

      //   location.assign("/home");
      // }
      // setError(null);
      await login(values.email, values.password);
      setLoading(false);

      setError(null);
      setLoad(false);
      // location.assign("/home");
    } catch (error) {
      setError(error);
      setLoading(false);
      Modal.error("Error de Context");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative ">
      <div className="app-header flex items-center justify-center h-96 flex-col gap-5">
        <h2 className="text-center underline uppercase text-3xl">
          Google New Featuring
        </h2>

        <Button
          style={{ backgroundColor: "black", color: "white" }}
          className="p-1 h-10 w-52"
          onClick={() => setShowModal(true)}
        >
          Sign In
        </Button>
      </div>

      <Modal
        className="h-80 w-44"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleLogin} className="m-5">
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password />
          </Form.Item>

          <div className="flex">
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={load}>
                Login
              </Button>
            </Form.Item>

            {/* <Button
              href="/reset"
              // style={{ color: "red", marginLeft: "160px" }}
              className="text-red right-0 lg:ms-56 sm:ms-0"
            >
              Reset password
            </Button> */}
          </div>
          <p className="text-gray-600 text-xs">
            You do not have an account{" "}
            <a href="/signup" className=" text-blue-700">
              SignUp
            </a>
          </p>
          {loading ? (
            <div className="spin_container flex justify-center items-center h-5">
              <Spin size="large" />
            </div>
          ) : error ? (
            <div className="error_container flex justify-center items-center h-80">
              <p className="text-red-800 text-3xl font-bold ">
                {error.message}
              </p>
            </div>
          ) : (
            <div className="spin_container flex justify-center items-center h-5">
              <Anchor size="large" />
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
}
