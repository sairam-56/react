import { useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Add, Clear, Remove } from "./redux/actions";
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
} from "antd";

import { DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function Ant() {
  const [inputValue, setInputValue] = useState("");
  const list = useSelector((state) => state?.counter?.list);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleAddItem = () => {
    if (inputValue.trim().length > 0) {
      dispatch(Add(inputValue.trim()));

      setInputValue("");
      form.resetFields();
    }
  };

  const handleClearAll = () => {
    dispatch(Clear());

    setInputValue("");
    form.resetFields();
  };

  const handleRemoveItem = (itemKey) => {
    dispatch(Remove(itemKey));
  };

  return (
    <Layout className="min-h-screen bg-white font-sans pt-16">
      <Header item={{ item: "ant" }} />
      <Content className="flex flex-col items-center p-4 sm:p-8">
        <Space direction="vertical" size="small" align="center">
          <Title level={2} className="text-3xl font-bold mb-0">
            made using ant design
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
                type="text"
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
                className="shrink-0 bg-stone-500 hover:!bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </Button>
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                onClick={handleClearAll}
                className="shrink-0 bg-stone-500 hover:!bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                      <Text className="pl-2 py-2 my-0 flex items-center flex-grow">
                        {itemKey}
                      </Text>{" "}
                      {count > 1 && (
                        <Tag
                          color="blue"
                          className="text-sm px-2 py-1 rounded-full"
                        >
                          count {count}
                        </Tag>
                      )}
                    </Content>
                    <Button
                      type="danger"
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveItem(itemKey)}
                      className="shrink-0 bg-black hover:!bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
  );
}

export default Ant;
