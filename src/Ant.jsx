import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, clear, remove } from "./redux/slice";
import {
  Layout,
  Input,
  Button,
  Form,
  List,
  Typography,
  Flex,
  Card,
  Tag,
  Divider,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Header from "./Header";

const { Content, Header: AntHeader } = Layout;
const { Title, Paragraph, Text } = Typography;

function Ant() {
  const [inputValue, setInputValue] = useState("");
  const list = useSelector((state) => state?.counter?.list || {});
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleAddItem = () => {
    if (inputValue.trim().length > 0) {
      dispatch(add(inputValue.trim()));
      setInputValue("");
      form.resetFields();
    }
  };

  const handleClearAll = () => {
    dispatch(clear());
    setInputValue("");
  };

  const handleRemoveItem = (itemKey) => {
    dispatch(remove(itemKey));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header item={{ item: "ant" }} />
      <AntHeader
        style={{
          background: "#001529",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Todo List - Ant Design Version
        </Title>
      </AntHeader>

      <Content style={{ padding: "24px 48px", marginTop: "24px" }}>
        <Flex justify="center" align="flex-start">
          <Card style={{ width: "100%", maxWidth: "700px" }}>
            <Flex vertical align="center" gap="middle">
              <Title level={2} style={{ marginTop: 0 }}>
                Made using Ant Design
              </Title>
              <Paragraph type="primary">
                using redux store to manage state
              </Paragraph>

              <Form
                form={form}
                layout="inline"
                onFinish={handleAddItem}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
                initialValues={{ itemInput: "" }}
              >
                <Form.Item name="itemInput" style={{ flexGrow: 1 }}>
                  <Input
                    autoFocus
                    placeholder="Type something to add..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleAddItem}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Item
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button onClick={handleClearAll} danger>
                    Clear All
                  </Button>
                </Form.Item>
              </Form>

              <Divider />

              {Object.keys(list).length > 0 ? (
                <List
                  header={<Title level={4}>Your Items</Title>}
                  bordered
                  dataSource={Object.entries(list)}
                  renderItem={([itemKey, count]) => (
                    <List.Item
                      actions={[
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveItem(itemKey)}
                          aria-label={`Delete ${itemKey}`}
                        >
                          Delete
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Text style={{ fontSize: "16px" }}>{itemKey}</Text>
                        }
                      />
                      {count > 1 && (
                        <Tag
                          color="geekblue"
                          style={{ fontSize: "14px", padding: "2px 8px" }}
                        >
                          Count: {count}
                        </Tag>
                      )}
                    </List.Item>
                  )}
                  style={{ width: "100%" }}
                />
              ) : (
                <Text
                  type="secondary"
                  style={{ marginTop: "20px", fontSize: "16px" }}
                ></Text>
              )}
            </Flex>
          </Card>
        </Flex>
      </Content>
    </Layout>
  );
}

export default Ant;
