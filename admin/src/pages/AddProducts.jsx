import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addProduct } from "../state/apiSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const AddProducts = () => {
  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [file, setFile] = useState([]);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
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

      const product = {
        ...inputs,
        images: downloadURLs,
        category: cat,
        color: color,
        size: size,
      };

      addProduct(product, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem ">
      <Header title="Add Products" />
      <Container>
        <Wrapper>
          <ProductInputs>
            <Label>Image</Label>
            <ImageInputContainer>
              <DriveFolderUploadIcon
                style={{ fontSize: "80px", color: "#6f42c1" }}
              />
              <h2>Upload The Image</h2>
              <ImageInput
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files)}
                multiple
              />
            </ImageInputContainer>
          </ProductInputs>
          <ProductInputs>
            <InputContainer>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Product Name"
                onChange={handleInput}
              />
            </InputContainer>
            <InputContainer>
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                placeholder="Shirts, Jeans ...."
                onChange={handleCat}
              />
            </InputContainer>
            <InputContainer>
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                placeholder="12000..."
                onChange={handleInput}
              />
            </InputContainer>
            <InputContainer>
              <Label>Description</Label>
              <TextInput
                rows={3}
                name="description"
                type="text"
                placeholder="Description"
                onChange={handleInput}
              />
            </InputContainer>
          </ProductInputs>
          <ProductInputs>
            <InputContainer>
              <Label>Colors</Label>
              <Input
                type="text"
                name="color"
                placeholder="Black, White"
                onChange={handleColor}
              />
            </InputContainer>
            <InputContainer>
              <Label>Size</Label>
              <Input
                type="text"
                name="size"
                placeholder="M , XL , MD..."
                onChange={handleSize}
              />
            </InputContainer>
            <InputContainer>
              <Label>Stock</Label>
              <Input
                type="number"
                name="Stock"
                placeholder="10, 20... "
                onChange={handleInput}
              />
            </InputContainer>

            <InputContainer>
              <AddProduct onClick={handleClick}>Add Product</AddProduct>
            </InputContainer>
          </ProductInputs>
        </Wrapper>
        <ImageWrapper>
          {file.length > 0 && (
            <SelectedImagesContainer>
              {Array.from(file).map((image) => (
                <SelectedImage
                  key={image.name}
                  src={URL.createObjectURL(image)}
                />
              ))}
            </SelectedImagesContainer>
          )}
        </ImageWrapper>
      </Container>
    </Box>
  );
};

export default AddProducts;

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.alt,
  padding: "10px 20px",
}));
const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  marginTop: "30px",
  marginBottom: "30px",
  paddingBottom: "40px",
  backgroundColor: theme.palette.background.alt,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));
const ImageWrapper = styled("div")(({ theme }) => ({
  display: "block",
  width: "100%",
  alignItems: "center",
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

const InputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  margin: "10px 0",
  padding: "0 10px",
}));

const ProductInputs = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  margin: "20px 0",
  borderRadius: "0.55rem",
  flexDirection: "column",
  padding: "10px",
  width: "100%",
  paddingRight: "80px",
  backgroundColor: theme.palette.background.alt,
  [theme.breakpoints.down("md")]: {
    padding: "10px",
    paddingRight: "0",
  },
}));

const Label = styled("label")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "20px",
  fontWeight: "600",
  alignSelf: "flex-start",
  marginBottom: "10px",
  marginLeft: "5px",
}));

const AddProduct = styled("button")(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.accentColor.blue,
  fontSize: "22px",
  fontWeight: "600",
  alignSelf: "self-start",
  marginTop: "20px",
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  width: "50%",
  [theme.breakpoints.down("lg")]: {
    alignSelf: "center",
  },
}));

const Input = styled("input")(({ theme }) => ({
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  padding: "10px 16px",
  alignSelf: "flex-start",
  color: theme.palette.primary.main,
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
}));

const TextInput = styled("textarea")(({ theme }) => ({
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  padding: "10px 16px",
  alignSelf: "flex-start",
  color: theme.palette.primary.main,
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
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
