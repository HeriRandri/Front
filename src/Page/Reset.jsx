import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  // axios.defaults.baseURL = "https://backfichier.onrender.com/";
  axios.defaults.baseURL = "http://localhost:4000";

  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const handleReset = async (values) => {
    try {
      const response = await axios.put("/reset", values, {
        withCredentials: true,
      });
      console.log("salut");

      if (response.data.success) {
        // localStorage.setItem("token", response.data.accessToken);
        Modal.success({ content: "password reset successful" });
        // Redirect to the desired route using React Router
        location.assign("/login");
      }
      console.log(values);
    } catch (error) {
      Modal.error({ content: error.response.data });
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
          Reset
        </Button>
      </div>
      <Modal
        className="h-80 w-44"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleReset} className="m-5">
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
