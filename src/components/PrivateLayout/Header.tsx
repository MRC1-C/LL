import React, { useState, useEffect } from "react";
import logo from "./image/C.png";
import { Input, Button, Avatar, Badge, Dropdown, Menu, Modal } from "antd";
import { BellOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SignIn from "../../containers/Login/SignIn";
import { getRequest } from "../../services/BaseAPI";
const NavBarStyle = styled.div`
  display: flex;
  max-width: 60vw;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px;
`;

const { Search } = Input;
export default function Header() {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      await getRequest("/users/getuser")
        .then((data: any) => setUserName(data.username))
        .catch((err: any) => console.log());
    };
    getUser();
  }, []);

  const handleCreatePost = () => {
    navigate("/createpost");
  };
  const handleLogo = () => {
    navigate("/");
  };
  const handleDashBoard = () => {
    navigate("/dashboard");
  };
  const content = (
    <div>
      <Menu mode="vertical" style={{ padding: "5px 10px", width: "200px" }}>
        <Menu.Item
          key="user"
          icon={<UserOutlined style={{ fontSize: "25px" }} />}
          style={{
            fontWeight: "500",
            borderBottom: "1px solid #efefef",
            fontSize: "20px",
          }}
        >
          {userName}
        </Menu.Item>
        <Menu.Item key="dashboard" onClick={handleDashBoard}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="readinglist">Readinglist</Menu.Item>
        <Menu.Item key="settings">Settings</Menu.Item>
        <Menu.Item
          key="signout"
          icon={<LogoutOutlined />}
          style={{ border: "1px solid #efefef", textAlign: "center" }}
          onClick={() => {
            localStorage.removeItem("accessToken");
            setUserName("");
          }}
        >
          Sign Out
        </Menu.Item>
      </Menu>
    </div>
  );

  const handleSignin = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <NavBarStyle>
      <Modal visible={visible} footer={null} onCancel={onCancel}>
        <SignIn onCancel={onCancel} setUserName={setUserName} />
        <p style={{ borderTop: "1px solid #efefef" }}>
          Do not have an account?
          <Button type="link" onClick={() => { navigate("/signup") }}>
            SignUp
          </Button>
        </p>
      </Modal>
      <div>
        <img
          src={logo}
          alt="logo"
          style={{ width: "31px", marginRight: "10px", cursor: "pointer" }}
          onClick={handleLogo}
        />
        <Search
          placeholder="Search . . ."
          onSearch={() => { }}
          style={{ width: "400px" }}
        />
      </div>
      {!userName ? (
        <div>
          <Button type="primary" onClick={handleSignin}>
            Sign In/Sign Up
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <Button type="primary" onClick={handleCreatePost}>
            Create Post
          </Button>
          <Button type="text">
            <Badge count={5}>
              <BellOutlined style={{ fontSize: "25px" }} />
            </Badge>
          </Button>
          <Dropdown
            overlay={content}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar
              size={35}
              style={{ marginRight: "10px", cursor: "pointer" }}
              src="https://getbootstrap.com.vn/blog/wp-content/uploads/2020/02/min-la-ai.jpg"
            >
              {userName[0]?.toUpperCase()}
            </Avatar>
          </Dropdown>
        </div>
      )}
    </NavBarStyle>
  );
}
