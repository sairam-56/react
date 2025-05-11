import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  Space,
  Typography,
  Modal,
  Form,
  DatePicker,
  Select,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Header from "./Header";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button
      type="primary"
      shape="round"
      size="large"
      className="shadow-md hover:shadow-lg transition-shadow duration-300"
      {...props}
    >
      {children}
    </Button>
  );
};

const StyledInput = ({ icon, placeholder, ...props }) => {
  return (
    <Input
      prefix={
        icon || <UserOutlined className="site-form-item-icon text-gray-400" />
      }
      placeholder={placeholder || "Enter value"}
      size="large"
      className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      {...props}
    />
  );
};

const InfoCard = ({ title, icon, children, cardClassName, titleClassName }) => {
  return (
    <Card
      title={
        <div
          className={`flex items-center ${titleClassName || "text-blue-600"}`}
        >
          {icon || <InfoCircleOutlined className="mr-2 text-xl" />}
          <Title level={5} className="mb-0">
            {title || "Information"}
          </Title>
        </div>
      }
      bordered={false}
      className={`shadow-lg rounded-lg ${cardClassName || "bg-white"}`}
      headStyle={{ borderBottom: "1px solid #f0f0f0", padding: "12px 24px" }}
      bodyStyle={{ padding: "24px" }}
    >
      {children}
    </Card>
  );
};

const ConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
  title = "Confirm Action",
  content = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon = <InfoCircleOutlined className="text-yellow-500 text-2xl" />,
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center">
          {icon}
          <span className="ml-2 text-lg font-semibold">{title}</span>
        </div>
      }
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={confirmText}
      cancelText={cancelText}
      okButtonProps={{
        className: "bg-green-500 hover:bg-green-600 border-green-500",
      }}
      cancelButtonProps={{
        className: "hover:border-red-500 hover:text-red-500",
      }}
      destroyOnClose
      centered
    >
      <Paragraph className="text-gray-700">{content}</Paragraph>
    </Modal>
  );
};

const FormItemWithTooltip = ({ label, tooltip, children, ...props }) => {
  return (
    <Form.Item
      label={
        <span>
          {label}
          {tooltip && (
            <InfoCircleOutlined
              className="ml-1 text-gray-400 cursor-help"
              title={tooltip}
            />
          )}
        </span>
      }
      {...props}
    >
      {children}
    </Form.Item>
  );
};

export default function CustomAntComponents() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleButtonClick = () => {
    Modal.info({
      title: "User Information",
      content: (
        <div>
          <p>Hello, {name || "User"}!</p>
          <p>Your email is {email || "not set"}.</p>
        </div>
      ),
      okButtonProps: {
        className: "bg-blue-500 hover:bg-blue-600 border-blue-500 text-white",
      },
    });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    console.log("Action confirmed");
    setModalVisible(false);

    Modal.success({
      title: "Success!",
      content: "The action was completed successfully.",
      okButtonProps: {
        className: "bg-blue-500 hover:bg-blue-600 border-blue-500",
      },
    });
  };

  const handleCancel = () => {
    console.log("Action cancelled");
    setModalVisible(false);
    Modal.error({
      title: "Cancelled",
      content: "The action was cancelled by the user.",
      okButtonProps: {
        className: "bg-red-500 hover:bg-red-600 border-red-500",
      },
    });
  };

  const onFinishForm = (values) => {
    console.log("Form Submitted:", values);
    Modal.success({
      title: "Form Submitted!",
      content: `Data: ${JSON.stringify(values, null, 2)}`,
      okButtonProps: {
        className: "bg-blue-500 hover:bg-blue-600 border-blue-500",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 p-4 sm:p-8 flex flex-col items-center font-sans">
      <Header item={{ item: "custom" }} />
      <Title level={2} className="mb-10 mt-20 text-gray-700">
        Made using Custom Ant Design components
      </Title>

      <Space direction="vertical" size="large" className="w-full max-w-2xl">
        <InfoCard
          title="User Details Form"
          icon={<UserOutlined className="mr-2 text-xl text-purple-500" />}
          cardClassName="bg-purple-50"
          titleClassName="text-purple-700"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinishForm}
            className="space-y-4"
          >
            <FormItemWithTooltip
              label="Full Name"
              name="fullName"
              tooltip="Please enter your full legal name."
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <StyledInput
                icon={
                  <UserOutlined className="site-form-item-icon text-gray-400" />
                }
                placeholder="e.g., Ada Lovelace"
              />
            </FormItemWithTooltip>

            <FormItemWithTooltip
              label="Email Address"
              name="emailAddress"
              tooltip="We'll never share your email with anyone else."
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not valid E-mail!" },
              ]}
            >
              <StyledInput
                icon={
                  <MailOutlined className="site-form-item-icon text-gray-400" />
                }
                placeholder="e.g., ada@example.com"
              />
            </FormItemWithTooltip>

            <FormItemWithTooltip
              label="Date of Birth"
              name="dob"
              tooltip="Please select your date of birth."
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <DatePicker
                className="w-full"
                size="large"
                placeholder="Select date"
              />
            </FormItemWithTooltip>

            <FormItemWithTooltip
              label="Favorite Color"
              name="favoriteColor"
              tooltip="Select your favorite color from the list."
              rules={[{ required: true, message: "Please select a color!" }]}
            >
              <Select
                placeholder="Select a color"
                size="large"
                className="w-full"
              >
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
                <Option value="yellow">Yellow</Option>
              </Select>
            </FormItemWithTooltip>

            <Form.Item>
              <PrimaryButton
                type="primary"
                htmlType="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Submit Form
              </PrimaryButton>
            </Form.Item>
          </Form>
        </InfoCard>

        <InfoCard
          title="Actions"
          icon={<CheckCircleOutlined className="mr-2 text-xl text-green-500" />}
        >
          <Space direction="vertical" className="w-full">
            <PrimaryButton
              onClick={handleButtonClick}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Show Info (Uses Form Data)
            </PrimaryButton>
            <PrimaryButton
              onClick={showModal}
              className="w-full bg-yellow-500 hover:bg-yellow-600"
            >
              Open Confirmation
            </PrimaryButton>
          </Space>
        </InfoCard>

        <InfoCard
          title="General Tip"
          icon={<InfoCircleOutlined className="mr-2 text-xl text-orange-500" />}
        >
          <Paragraph>
            Custom components help in maintaining consistency and reducing
            boilerplate code. Ant Design provides a strong foundation to build
            upon. Remember to include Tailwind CSS in your project for the
            styles to apply correctly.
          </Paragraph>
        </InfoCard>
      </Space>

      <ConfirmationModal
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Are you absolutely sure?"
        content="This action might have consequences. Please confirm if you wish to proceed."
        icon={<CloseCircleOutlined className="text-red-500 text-2xl" />}
        confirmText="Yes, Proceed"
        cancelText="No, Go Back"
      />
    </div>
  );
}
