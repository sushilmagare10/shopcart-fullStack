import { loginSuccess, loginFailure, logout } from "./authSlice";
import { adminRequest } from "../requestMethods";
import {
  addProductFailure,
  addProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  getProductFailure,
  getProductSuccess,
  updateProductFailure,
  updateProductSuccess,
} from "./productSlice";
import { getUsersFailure, getUsersSuccess } from "./userSlice";

export const login = async (dispatch, auth) => {
  try {
    const res = await adminRequest.post("/adminlogin", auth);

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export const getProducts = async (dispatch) => {
  try {
    const res = await adminRequest.get(`/products`);
    dispatch(getProductSuccess(res.data.products));
    console.log(res.data);
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  try {
    const res = await adminRequest.post("/admin/product/new", product);
    dispatch(addProductSuccess(res.data.product));

    // Fetch the updated list of products after adding the new product
    await getProducts(dispatch);
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await adminRequest.delete(`admin/product/${id}`);
    dispatch(deleteProductSuccess(id));
    console.log(res);
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = (id, product, dispatch) => {
  const updateProductAsync = async () => {
    try {
      // update
      const res = await adminRequest.put(`admin/product/${id}`, product);
      dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };

  updateProductAsync();
};

/// users

export const getUsers = async (dispatch) => {
  try {
    const res = await adminRequest.get(`/users`);
    dispatch(getUsersSuccess(res.data.users));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};
