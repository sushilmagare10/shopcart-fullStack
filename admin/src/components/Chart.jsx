import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { styled } from "@mui/material/styles";

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;

const Title = styled("h2")(({ theme }) => ({
  fontSize: "20px",
}));
