import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Header from "../components/Header";
import { adminRequest } from "../requestMethods";
import { updateProduct } from "../state/apiSlice";
import Chart from "../components/Chart";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [productStats, setProductStats] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await adminRequest.get("/admin/income?pid=" + productId);

        // Find the maximum month index in the API data
        const maxMonthIndex = Math.max(...res.data.map((item) => item._id - 1));

        // Calculate the starting index for the last two months
        const startIndex = maxMonthIndex >= 1 ? maxMonthIndex - 1 : 0;

        // Create an array to store the data for the last two months
        const lastTwoMonthsData = new Array(2).fill(0);

        // Map the API data to the lastTwoMonthsData array
        res.data.forEach((item) => {
          const adjustedIndex = item._id - 1 - startIndex;
          if (adjustedIndex >= 0 && adjustedIndex < 2) {
            lastTwoMonthsData[adjustedIndex] = item.total;
          }
        });

        const productStatsData = lastTwoMonthsData.map((total, index) => ({
          name: MONTHS[startIndex + index],
          Sales: total,
        }));

        setProductStats(productStatsData);

        const totalOrdersRes = await adminRequest.get(
          "/admin/totalorders/" + productId
        );
        setTotalOrders(totalOrdersRes.data.totalOrders);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  // update product

  const [inputs, setInputs] = useState({});
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [file, setFile] = useState([]);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const fileArray = Array.from(file);

    try {
      const downloadURLs = await Promise.all(
        fileArray.map((file) => {
          const fileName = new Date().getTime() + file.name;
          const storage = getStorage(app);
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                  default:
                }
              },
              (error) => {
                reject(error);
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                  resolve(downloadURL); // Resolve with the downloadURL
                } catch (error) {
                  reject(error);
                }
              }
            );
          });
        })
      );

      const updatedProduct = {
        ...product,
        ...inputs,
        images: [...product.images, ...downloadURLs],
        color,
        size,
      };

      updateProduct(product._id, updatedProduct, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem" pb={3}>
      <Header title="Product" />

      <ChartContainer>
        <Chart
          data={productStats}
          dataKey="Sales"
          title="Sales Performance"
          grid
        />
      </ChartContainer>
      <Statistics>
        <StatisticsInfo>
          <Title>{product.name}</Title>
        </StatisticsInfo>
        <StatisticsInfo>
          <Title>ProductID : {product._id}</Title>
          <Title>Stock : {product.Stock}</Title>
        </StatisticsInfo>
        <StatisticsInfo>
          <Totalorder>Total Orders: {totalOrders}</Totalorder>
        </StatisticsInfo>
      </Statistics>

      <ProductInfoBottom>
        <Wrapper>
          <Flex>
            <Title>Images</Title>
            <ImageInputContainer>
              <DriveFolderUploadIcon
                style={{ fontSize: "80px", color: "#6f42c1" }}
              />
              <h2>Upload Images</h2>
              <ImageInput
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files)}
                multiple
              />
            </ImageInputContainer>
          </Flex>
          <ProductInfo>
            <Flex>
              <Title>Name : </Title>
              <Input
                placeholder={product.name}
                type="text"
                name="name"
                onChange={handleInput}
              />
            </Flex>
            <Flex>
              <Title>Price : </Title>
              <Input
                placeholder={product.price}
                type="number"
                name="price"
                onChange={handleInput}
              />
            </Flex>
          </ProductInfo>
          <ProductInfo>
            <Flex>
              <Title>Size : </Title>
              <Input
                placeholder={product.size}
                type="text"
                name="size"
                onChange={handleSize}
              />
              <Row>
                {product.size.map((i) => (
                  <Tabs key={i}>{i}</Tabs>
                ))}
              </Row>
            </Flex>
            <Flex>
              <Title>Colors : </Title>
              <Input
                placeholder={product.color}
                type="text"
                name="color"
                onChange={handleColor}
              />
              <Row>
                {product.color.map((i) => (
                  <Tabs key={i}>{i}</Tabs>
                ))}
              </Row>
            </Flex>
          </ProductInfo>
          <ProductInfo>
            <Flex>
              <Title>Desc : </Title>
              <TextInput
                rows={10}
                placeholder={product.description}
                type="text"
                name="description"
                onChange={handleInput}
              />
            </Flex>
            <UpdateButton onClick={handleClick}>
              Update The Product
            </UpdateButton>
          </ProductInfo>
        </Wrapper>
      </ProductInfoBottom>
      <ImageWrapper>
        {product.images.length > 0 && (
          <SelectedImagesContainer>
            {product.images.map((image, index) => (
              <SelectedImage key={index} src={image} />
            ))}
            {file.length > 0 &&
              Array.from(file).map((image, index) => (
                <SelectedImage
                  key={index + product.images.length}
                  src={URL.createObjectURL(image)}
                />
              ))}
          </SelectedImagesContainer>
        )}
      </ImageWrapper>
    </Box>
  );
};

export default Product;

const Flex = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  marginTop: "30px",
  marginBottom: "30px",
  padding: "10px 25px",
  backgroundColor: theme.palette.background.alt,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

const ImageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "start",
  justifyContent: "flex-start",
  marginTop: "20px",
  marginBottom: "30px",
  padding: "20px 20px",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.alt,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    padding: "10px 10px",
  },
}));

const UpdateButton = styled("div")(({ theme }) => ({
  display: "flex",
  fontSize: "20px",
  fontWeight: "600",
  marginTop: "20px",
  padding: "8px 10px",
  border: "none",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "flex-start",
  borderRadius: "0.55rem",
  cursor: "pointer",
  color: "#fff",
  backgroundColor: theme.palette.accentColor.teal,
  [theme.breakpoints.down("lg")]: {
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "16px",
    marginBottom: "20px",
    padding: "15px 10px",
    border: "none",
    alignSelf: "center",
  },
}));

const Statistics = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "30px",
  marginTop: "10px",
  borderRadius: "0.55rem",
  backgroundColor: theme.palette.background.alt,
  boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

const ProductInfo = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "flex-start",
  alignItems: "center",
  borderRadius: "0.55rem",
  padding: "0 20px",
  backgroundColor: theme.palette.background.alt,
}));
const StatisticsInfo = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "0.55rem",
  padding: "0 30px",
  backgroundColor: theme.palette.background.alt,
}));

const ProductInfoBottom = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "20px 0",
  borderRadius: "0.55rem",
  padding: "10px",
  backgroundColor: theme.palette.background.alt,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const Title = styled("h1")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "bold",
  alignSelf: "flex-start",
  marginBottom: "12px",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("lg")]: {
    textAlign: "center",
  },
}));

const Totalorder = styled("h2")(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "600",
  textAlign: "center",
  marginBottom: "12px",
}));

const ChartContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "40vh",
  marginBottom: "30px",
  borderRadius: "0.55rem",
  padding: "20px",
  backgroundColor: theme.palette.background.alt,
  [theme.breakpoints.down("lg")]: {
    height: "340px",
  },
}));

const Input = styled("input")(({ theme }) => ({
  fontSize: "16px",
  borderRadius: "8px",
  borderWidth: "1px",
  borderColor: "#ccc",
  padding: "10px 16px",
  alignSelf: "flex-start",
  color: theme.palette.primary.main,
  width: "80%",
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

const TextInput = styled("textarea")(({ theme }) => ({
  fontSize: "16px",
  borderRadius: "8px",
  borderWidth: "1px",
  borderColor: "#ccc",
  padding: "10px 16px",
  alignSelf: "flex-start",
  color: theme.palette.primary.main,
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
  overflow: "auto",
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

const Row = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "start",
  height: "100px",
  padding: "10px",
}));

const Tabs = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "flex-start",
  backgroundColor: theme.palette.background.default,
  padding: "5px 10px",
  borderRadius: "8px",
  fontWeight: "600",
  marginRight: "25px",
}));

const ImageInput = styled("input")(({ theme }) => ({
  display: "none",
}));

const ImageInputContainer = styled("label")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  width: "100%",
  minHeight: "350px",
  borderRadius: "8px",
  border: "2px dashed #6f42c1",
  backgroundColor: "#f8f8f8",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  "&:hover": {
    borderColor: "#6f42c1",
  },
}));

const SelectedImagesContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "310px",
  gridColumnGap: "10px",
  gridRowGap: "10px",

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridTemplateRows: "310px",
  },
}));

const SelectedImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "300px",
  objectFit: "contain",
  borderRadius: "8px",
}));
