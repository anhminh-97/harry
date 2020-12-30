import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Table, Tag, Space, Button, Modal, Input } from "antd";
import { Formik, Form } from "formik";

function App() {
  const [data, setData] = useState([]);
  const [change, setChange] = useState({ title: "", author: "" });
  const [isActive, setIsActive] = useState(false);
  const [list, setList] = useState([]);
  const onHandleDelete = async (id) => {
    console.log("babe minh", id);
    await axios.delete(`http://localhost:3000/product/${id}`);
    axios
      .get("http://localhost:3000/product")
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "author",
      dataIndex: "author",
      key: "author",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={showModal}>
            Edit
          </Button>
          {console.log(record)}
          <Button onClick={() => onHandleDelete(record.id)} type="primary">
            Delete
          </Button>
          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {/* <p>{record.title}</p> */}
            <Formik
              initialValues={record}
              onSubmit={(value) => handleSubmit2(value)}
              children={(props) => {
                const {
                  values,
                  setFieldValue,
                  setValues,
                  handleSubmit,
                } = props;
                console.log(props);
                return (
                  <Form onSubmit={handleSubmit}>
                    <Input
                      name="title"
                      onChange={(e) => setFieldValue("title", e.target.value)}
                      // onBlur={handleBlur}
                      value={values.title}
                    />
                    {/* {errors.password && touched.password && errors.password} */}
                    <Button htmlType="Submit" type="primary">
                      Submit
                    </Button>
                  </Form>
                );
              }}
            />
          </Modal>
        </Space>
      ),
    },
  ];

  const handleSubmit2 = (value) => {
    console.log("value", value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [list]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <div>
        <Table dataSource={data} columns={columns} />
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
      </div>
    </div>
  );
}

export default App;
