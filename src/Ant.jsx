import React, { useState } from "react";
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
    <Layout className="min-h-screen bg-gray-100 font-sans pt-16">
      <Content className="flex flex-col items-center p-4 sm:p-8">
        <Header item={{ item: "ant" }} />
        <div className="w-full max-w-xl mt-4 space-y-1 text-center">
          <Title level={1} className="!text-3xl !font-bold !mb-0">
            made using ant design
          </Title>
          <Paragraph className="!mt-0">
            using redux store to manage state
          </Paragraph>
        </div>
        <div className="w-full max-w-xl mt-4">
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
                className="shrink-0 bg-stone-500 hover:!bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </Button>
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                // type="primary"
                onClick={handleClearAll}
                className=" bg-stone-500 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                clear all
              </Button>
            </Form.Item>
          </Form>
          <div className="p-4 space-y-4">
            {Object.keys(list).length > 0 ? (
              <List
                bordered={false}
                dataSource={Object.entries(list)}
                renderItem={([itemKey, count], index) => (
                  <List.Item
                    key={itemKey}
                    className="flex justify-between items-center h-full p-0"
                  >
                    <div className="flex items-center w-full bg-gray-100 px-2 mr-4 rounded">
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
                    </div>
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
              <div className="text-center text-gray-500">
                No items in the list.
              </div>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Ant;
