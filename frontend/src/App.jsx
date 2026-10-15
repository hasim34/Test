import { Space, Typography, Card, Input, Select, Button } from "antd";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [lowStock, setLowStock] = useState(false);

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
      </Space>
    </div>
  )
}

export default App;