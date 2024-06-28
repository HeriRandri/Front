import { Button, Spin } from "antd";
import LoginButton from "../PageTest/LoginButton";
import LogoutButton from "../PageTest/logoutButton";

export default function Header() {
  return (
    <div>
      <div className=" max-w-5xl mx-auto h-screen rounded-t-lg shadow-lg shadow-slate-900/6">
        <div className="app-header flex items-center justify-center flex-col gap-5 h-5/6">
          <h2 className="text-center  uppercase text-3xl text-white">
            Google New Featuring
          </h2>
          <Button type="">
            <a href="/signup">Get Started</a>
          </Button>
          <LoginButton />
          <LogoutButton />
        </div>
        <footer className="flex justify-end items-center flex-col gap-2 ">
          <p>Copyright 2024 Nandrianina Dev</p>
          <Spin></Spin>
        </footer>
      </div>
    </div>
  );
}
