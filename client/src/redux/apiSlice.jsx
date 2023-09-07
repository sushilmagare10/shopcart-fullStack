import { publicRequest, userRequest } from "../requestMethods";
import {
  loginSuccess,
  loginFailure,
  logout,
  resgisterUser,
  resgisterUserFailure,
} from "./authSlice";
import {
  createOrder,
  createOrderFail,
  getAllOrders,
  getAllOrdersFail,
} from "./orderSlice";

export const login = async (dispatch, auth) => {
  try {
    const res = await userRequest.post("/login", auth);

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, auth) => {
  try {
    const res = await publicRequest.post("/register", auth);

    dispatch(resgisterUser(res.data));
  } catch (error) {
    dispatch(resgisterUserFailure());
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
