import { useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { add, clear, remove } from "./redux/slice";

import {
  Layout,
  Input,
  Button,
  Form,
  List,
  Typography,
  Space,
  Tag,
  Card,
  ConfigProvider,
  Row,
  Col,
} from "antd";

import { DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function CustomAntDesign() {
  const [inputValue, setInputValue] = useState("");
  const list = useSelector((state) => state?.counter?.list);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [darkMode, setDarkMode] = useState(false);

  const handlemMode = () => {
    setDarkMode(!darkMode);
  };

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
    form.resetFields();
  };

  const handleRemoveItem = (itemKey) => {
    dispatch(remove(itemKey));
  };
  const theme = {
    components: {
      Button: {
        colorPrimary: "#00b96b",
        colorPrimaryHover: "#00a854",
        colorPrimaryActive: "#019249",

        defaultColor: darkMode === false ? "#ffffff" : "#000000",
        defaultBg: darkMode !== false ? "#c34e4e" : "#000000",
        defaultBorderColor: darkMode !== false ? "#c34e4e" : "#000000",
        defaultHoverColor: "#FFFFFF",
        defaultHoverBg: "#b40000  ",
        defaultHoverBorderColor: "#000000",

        defaultActiveColor: "#000000",

        controlHeight: 40,
      },
      Input: {
        colorPrimary: darkMode !== false ? "#ffffff" : "#000000",
        colorPrimaryHover: darkMode !== false ? "#ffffff" : "#000000",
        colorBorder: "#000000",
      },
    },
    token: {
      colorBgLayout: darkMode === false ? "#ffffff" : "#000000",
      colorText: darkMode !== false ? "#ffffff" : "#000000",

      defaultColor: "#000000",
      colorBgContainer: "#ffffff",
      colorBorder: "#ffffff",

      controlHeight: 32,
    },
  };
  return (
    <ConfigProvider theme={theme}>
      <Layout className="min-h-screen   pt-16">
        <Header item={{ item: "custom" }} />
        <Content size="full" className="flex flex-col items-center p-4 sm:p-8">
          <Row justify="end" className="w-full h-0 p-0 m-0">
            <Col>
              <Button
                className={
                  darkMode
                    ? "bg-white  hover:bg-slate-500"
                    : "bg-black  hover:bg-slate-500"
                }
                onClick={handlemMode}
              >
                {darkMode === false ? "dark" : "light"} mode
              </Button>
            </Col>
          </Row>
          <Space direction="vertical" size="small" align="center">
            <Title level={2} className="text-3xl font-bold mb-0">
              made using custom ant design components
            </Title>
            <Paragraph>using redux store to manage state</Paragraph>
          </Space>
          <Content className="w-full max-w-xl mt-4">
            <Form
              form={form}
              onFinish={handleAddItem}
              className="p-4 flex space-x-2 items-center"
            >
              <Form.Item name="itemInput" className="mb-0 flex-grow">
                <Input
                  autoFocus
                  placeholder="type something"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onPressEnter={handleAddItem}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="shrink-0  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </Button>
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  onClick={handleClearAll}
                  className=" font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  clear all
                </Button>
              </Form.Item>
            </Form>
            <Content className="p-4 w-full space-y-4">
              {Object.keys(list).length > 0 ? (
                <List
                  justify="space-between"
                  className="w-full"
                  bordered={false}
                  dataSource={Object.entries(list)}
                  renderItem={([itemKey, count]) => (
                    <List.Item
                      key={itemKey}
                      className="flex justify-between w-full items-center h-full p-0"
                    >
                      <Content className="flex items-center w-full bg-gray-100 px-2 mr-4 rounded">
                        <Text className="pl-2 py-2 my-0 flex   text-black items-center flex-grow">
                          {itemKey}
                        </Text>{" "}
                        {count > 1 && (
                          <Tag className="text-sm  text-black px-2 py-1 rounded-full">
                            count {count}
                          </Tag>
                        )}
                      </Content>
                      <Button
                        type="default"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveItem(itemKey)}
                        className="shrink-0 font-bold py-2 px-4 rounded "
                      >
                        delete
                      </Button>
                    </List.Item>
                  )}
                />
              ) : (
                <Content align="center" className="text-center text-gray-500">
                  No items in the list.
                </Content>
              )}
            </Content>
          </Content>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default CustomAntDesign;
