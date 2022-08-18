import React from "react";
import { Button, Divider, Form, Input } from "antd";
import styled from "styled-components";
import { postRequest } from "../../services/BaseAPI";

const LoginStyle = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

export default function SignIn(props: any) {
    const [form] = Form.useForm();

    const handleLogin = async () => {
        await postRequest("/auth/signin", form.getFieldsValue())
            .then((data: any) => {
                console.log(data);
                localStorage.setItem("accessToken", data.id);
                props.setUserName(form.getFieldValue("username"));
            })
            .catch((err: any) => console.log(err));
        props.onCancel();
    };

    return (
        <LoginStyle>
            <h1 style={{ fontWeight: "750" }}>Welcome to C</h1>
            <Button type="primary" block style={{ marginBottom: "10px" }}>
                Login with Facebook
            </Button>
            <Button block>Login with Google</Button>
            <Divider />
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="username"
                    label={<span style={{ fontWeight: "500" }}>User Name</span>}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label={<span style={{ fontWeight: "500" }}>Password</span>}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </LoginStyle>
    );
}
