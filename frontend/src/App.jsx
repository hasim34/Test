import { Space, Typography, Card, Input, Select, Button, Tag, Table } from "antd";
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

  const filteredStock = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    const matchesLowStock = !lowStock || product.stock <= 5;

    return matchesSearch && matchesCategory && matchesLowStock;
  });

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
              { value: "accessories", label: "Accessories" },
              { value: "Electronics", label: "Electronics" }
            ]} style={{ width: "180px" }}></Select>

            <Button type={lowStock ? "primary" : "default"}
              onClick={() => setLowStock((previous) => !previous)}>
              {lowStock ? "Show All Products" : "Low Stock Only"}</Button>

          </Space>
        </Card>
        <Typography.Title>Products Found: {filteredStock.length}</Typography.Title>
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