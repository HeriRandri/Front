import { Button, Form, Input, Modal, Spin } from "antd";
import { useState } from "react";
// import { MdClose } from "react-icons/md";
import axios from "axios";

const Sign_up = () => {
  axios.defaults.baseURL = "https://backfichier.onrender.com/";
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [section, setSection] = useState(false);
  const [form] = Form.useForm();

  // const [data, setData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const { value, name } = e.target;
  //   setData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const dataSent = await axios.post("/signup", data);
  //     if (dataSent.data) {
  //       alert("New user Created");
  //       location.assign("/login");
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       if (error.response.status === 409) {
  //         alert("That email is already registered.");
  //       } else {
  //         alert("An error occurred. Please try again later.");
  //       }
  //     } else {
  //       alert("An error occurred. Please check your network connection.");
  //     }
  //   }
  // };

  const handleSingUp = async (value) => {
    setLoading(true);
    try {
      const res = await axios.post("/signup", value);
      if (res.data) {
        // Modal.success({ content: "New User Created" });
        Modal.success({ content: "Sign Up Successful" });

        location.assign("/login");
      }
    } catch (erreur) {
      setLoading(false);
      if (erreur.response) {
        if (erreur.response.status === 409) {
          Modal.error({ content: "That email is already registered." });
        } else {
          Modal.error({
            content: "An error occurred. Please try again later.",
          });
        }
      } else {
        Modal.error({
          content: "An error occurred. Please check your network connection.",
        });
      }
    }
  };

  return (
    <div className="relative">
      <div className="app-header flex items-center justify-center h-96 flex-col gap-5">
        <h2 className="text-center underline uppercase text-3xl">
          Google New Featuring
        </h2>
        <Button
          style={{ backgroundColor: "black", color: "white" }}
          className="p-1 h-10 w-52"
          onClick={() => setShowModal(true)}
        >
          Sign Up
        </Button>
      </div>
      {loading ? (
        <div className="spin_container flex justify-center items-center h-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="error_container flex justify-center items-center h-80">
          <p className="text-red-800 text-3xl font-bold "></p>
        </div>
      )}
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={400}
      >
        <Form form={form} onFinish={handleSingUp} className="m-5 ">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
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
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            className="flex flex-row items-center mb-4"
            rules={[
              { required: true, message: "Please enter your password" },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              SignUp
            </Button>
            <p className="text-gray-600 text-xs">
              You have an account{" "}
              <a href="/login" className=" text-blue-700">
                SignIn
              </a>
            </p>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Sign_up;
