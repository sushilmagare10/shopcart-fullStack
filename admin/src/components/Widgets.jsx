import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { styled } from "@mui/material/styles";
import { adminRequest } from "../requestMethods";

const Widgets = () => {
  const theme = useTheme();

  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await adminRequest.get("/admin/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  const [totalOrders, setTotalOrders] = useState(0);
  const [ordersPerMonth, setOrdersPerMonth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adminRequest.get("/admin/orders/per-month");
        setOrdersPerMonth(res.data.ordersPerMonth);
        console.log("orders", res);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <FeaturedContainer>
      <FeaturedItem>
        <FeaturedTitle>Revenue</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>${income[1]?.total}</FeaturedMoney>
          <FeaturedMoneyRate>
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <FeaturedIcon negative>
                <ArrowDownwardIcon />
              </FeaturedIcon>
            ) : (
              <FeaturedIcon>
                <ArrowUpwardIcon />
              </FeaturedIcon>
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>

      <FeaturedItem>
        <FeaturedTitle>Sales</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>
            ${income.reduce((acc, item) => acc + item.total, 0)}
          </FeaturedMoney>
          <FeaturedMoneyRate>
            {perc < 0 ? (
              <FeaturedIcon negative>
                <ArrowDownwardIcon />
              </FeaturedIcon>
            ) : (
              <FeaturedIcon>
                <ArrowUpwardIcon />
              </FeaturedIcon>
            )}
            {Math.abs(perc).toFixed(1)}% {/* Display the sales rate */}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>

      <FeaturedItem>
        <FeaturedTitle>Orders This Month</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>{ordersPerMonth[1]?.totalOrders}</FeaturedMoney>
          <FeaturedMoneyRate>
            +2.4{" "}
            <FeaturedIcon>
              <ArrowUpwardIcon />
            </FeaturedIcon>
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Total Orders</FeaturedSub>
      </FeaturedItem>
    </FeaturedContainer>
  );
};

export default Widgets;

const FeaturedContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",

  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    gap: "16px",
  },
}));

const FeaturedItem = styled("div")(({ theme }) => ({
  flex: "1",
  margin: "0px 20px",
  padding: "30px",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: theme.palette.background.alt,
  boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
}));

const FeaturedTitle = styled("span")(({ theme }) => ({
  fontSize: "20px",
}));

const FeaturedMoneyContainer = styled("div")(({ theme }) => ({
  margin: "10px 0px",
  display: "flex",
  alignItems: "center",
}));

const FeaturedMoney = styled("span")(({ theme }) => ({
  fontSize: "30px",
  fontWeight: "600",
}));

const FeaturedMoneyRate = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "20px",
}));

const FeaturedIcon = styled("span")(({ theme, negative }) => ({
  fontSize: "14px",
  marginLeft: "5px",
  color: negative ? "red" : "green",
}));

const FeaturedSub = styled("span")(({ theme }) => ({
  fontSize: "15px",
  color: "gray",
}));
