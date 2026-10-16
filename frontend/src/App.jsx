import { Space, Typography, Card, Input, Select, Button, Tag, Table, Modal, Form } from "antd";
import { useState } from "react";

const products = [
  { id: 1, name: "Wireless Mouse", category: "Accessories", price: 799, stock: 12 },
  { id: 2, name: "Keyboard", category: "Accessories", price: 1599, stock: 4 },
  { id: 3, name: "Monitor", category: "Electronics", price: 12499, stock: 0 },
  { id: 4, name: "USB-C Hub", category: "Electronics", price: 2499, stock: 7 },
  { id: 5, name: "Webcam", category: "Accessories", price: 3299, stock: 3 },
];

const columns = [
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `₹${price.toLocaleString("en-IN")}`,
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Status",
    dataIndex: "stock",
    key: "status",
    render: (stock) => {
      if (stock === 0) {
        return <Tag color="red">Out of stock</Tag>;
      }

      if (stock <= 5) {
        return <Tag color="orange">Low stock</Tag>;
      }

      return <Tag color="green">In stock</Tag>;
    },
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [lowStock, setLowStock] = useState(false);
  const [price, setPrice] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [form] = Form.useForm();

  const filteredStock = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    const matchesLowStock = !lowStock || product.stock <= 5;

    const matchesPrice = !price || product.price < 3000;

    return matchesSearch && matchesCategory && matchesLowStock && matchesPrice;
  });

  const totalStock = filteredStock.reduce((total, product) => total + product.stock, 0);

  return (
    <div style={{ maxWidth: 1100, margin: "32px auto", padding: "20px" }}>
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Typography.Title level={2}>Inventory Dashboard</Typography.Title>
          <Typography.Text>Monitor products and stock availability.</Typography.Text>
        </div>
        <Card>
          <Space>
            <Input placeholder="Search Products" allowClear value={search}
              onChange={(e) => (setSearch(e.target.value))} style={{ width: "220px" }}>
            </Input>
            <Select value={category} onChange={setCategory} options={[
              { value: "all", label: "All Categories" },
              { value: "Accessories", label: "Accessories" },
              { value: "Electronics", label: "Electronics" }
            ]} style={{ width: "180px" }}></Select>

            <Button type={lowStock ? "primary" : "default"}
              onClick={() => setLowStock((previous) => !previous)}>
              {lowStock ? "Show All Products" : "Low Stock Only"}</Button>

            <Button type={price ? "primary" : "default"} onClick={() => setPrice((previous) => !previous)}>{price ? "Show All prices" : "Price Filter(Less than 3000)"}</Button>
            <Button type="primary" onClick={() => setIsModelOpen(true)}>Add Product</Button>
          </Space>
        </Card>
        <Modal title="Add Product" open={isModelOpen} onCancel={() => {
          setIsModelOpen(false);
          form.resetFields();
        }} okText="Add Product" onOk={() => form.submit()}>
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Product Name" rules={[
              { required: true, message: "Enter the product name" },
              { min: 2, message: "Name must contain at least 2 characters" },
            ]}>
              <Input placeholder="e.g. Wireless Mouse" maxLength={100} />
            </Form.Item>

            <Form.Item name="category" label="category" rules={[{required: true}]}>

            </Form.Item>
          </Form>
        </Modal>
        <Space size="large">
          <Typography.Text>Products Found: {filteredStock.length}</Typography.Text>
          <Typography.Text>Total Stock : {totalStock}</Typography.Text>
        </Space>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredStock}
          pagination={{ pageSize: 5 }}
          locale={{
            emptyText: "No products match your filters.",
          }}
        />
      </Space>
    </div>
  )
}

export default App;