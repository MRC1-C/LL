import React from 'react';
import { Button, Form, Input } from "antd"
import { postRequest } from '../../services/BaseAPI';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyleRegister = styled.div`
    padding: 30px;
    border: 1px solid lightgray;
    border-radius: 5px;
    text-align: center;
    max-width: 40vw;
    margin: 0 auto;
`;

export default function SignUp() {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const handleLogin = async () => {
        await postRequest("/auth/signup", {
            username: form.getFieldValue('username'),
            password: form.getFieldValue('password')
        })
            .then(data => {
                localStorage.setItem("accessToken", data.id)
                navigate("/")
            })
            .catch(err => console.log(err))
    }
    return <div >
        <div style={{ height: "200px" }}></div>
        <StyleRegister>
            <Form form={form} layout='vertical' onFinish={handleLogin}>
                <Form.Item >
                    <h1>Blog C</h1>
                </Form.Item>
                <Form.Item label="Username" name="username" rules={[
                    {
                        required: true,
                        message: 'Please input your UserName!',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Sign up</Button>
                </Form.Item>
            </Form>
        </StyleRegister>

    </div>;
}
