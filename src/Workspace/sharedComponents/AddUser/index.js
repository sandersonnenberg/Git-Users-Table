import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, FileImageOutlined, MailOutlined  } from "@ant-design/icons";
import "./styles.css";

export default function AddUser({ addUserResponse }) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState(); //disables the submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    addUserResponse(values);
  };

  return (
    <div className="add-user-container">
      <h3>Add a User</h3>

      <Form form={form} name="horizontal_login" onFinish={onFinish}>
        <Form.Item
          name="login_name"
          rules={[
            {
              required: true,
              message: "Please insert your user name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="user_password"
          rules={[
            {
              required: true,
              message: "Please insert your password!",
            },
          ]}
        >
          <Input
           
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="user_mail"
          rules={[
            {
              required: true,
              message: "Please insert your mail!",
            },
          ]}
        >
          <Input
            type="email"
            prefix={<MailOutlined  className="site-form-item-icon" />}
            placeholder="e-mail"
          />
        </Form.Item>
        <Form.Item
          name="user_avatar"
          rules={[
            {
              required: true,
              message: "Please insert a image url!",
            },
          ]}
        >
          <Input
            prefix={<FileImageOutlined className="site-form-item-icon" />}
            type="url"
            placeholder="Image URL"
          />
        </Form.Item>
        <br/>
        <Form.Item shouldUpdate={true}>
          
          {() => (
            <Button
              className="add-button"
              type="link" block
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
                  || !  form.getFieldValue("user_avatar").startsWith("http")
              }
            >
              Save
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
