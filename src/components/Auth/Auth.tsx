import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { invoke } from '@tauri-apps/api/tauri';
import Spinner from '../Spinner/Spinner';


type LoginFormType = {
  auth: (auth: boolean) => void;
};

export const Auth: React.FC<LoginFormType> = ({ auth }) => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [form, setForm] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onDisabledForm = () => setForm(!form);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const result = await invoke<string>('create_user', { name, password });
      console.log(result)
      message.success('User created successfully');
      setForm(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Error creating user:', error);
      message.error('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorizeUser = async () => {
    setLoading(true);
    try {
      const result = await invoke<string>('authorize_user', { name, password });
      console.log(result);
      auth(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error('Error authorizing user:', error);
      message.error('Incorrect username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
  const isValidInput = (): boolean => name.length < 4 || password.length < 6;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form
          style={{ maxWidth: '700px' }}
          name="normal_login"
          className="login-form"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input value={name} onChange={changeName} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              onChange={changePassword}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            {form ? (
              <>
                <Button
                  onClick={handleAuthorizeUser}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                  style={{ margin: '0 auto', padding: '0 90px' }}
                >
                  Log in
                </Button>
                Or <Button type="link" onClick={onDisabledForm} size="small" style={{ marginTop: '10px' }}>Create now!</Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleCreateUser}
                  disabled={isValidInput()}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                  style={{ margin: '0 auto', padding: '0 90px' }}
                >
                  Create
                </Button>
                Or <Button type="link" onClick={onDisabledForm} size="small" style={{ marginTop: '10px' }}>Come back!</Button>
              </>
            )}
          </Form.Item>
        </Form>
      )}
    </>
  );
};




