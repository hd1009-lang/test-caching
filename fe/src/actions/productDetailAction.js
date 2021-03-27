import axios from 'axios';
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_RESET,
} from '../constants/productConstant';

export const detailProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      // payload:error.response && error.response.data.msg
      payload: error.response && error.response.data.msg,
    });
  }
};

export const reviewProduct = (productid,review) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({type: PRODUCT_REVIEW_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.post(
      `/api/products/${productid}/review`,
      review,
      config,
    );
    dispatch({
      type: PRODUCT_REVIEW_SUCCESS,
    });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload: error.response && error.response.data.msg,
    });
  }
};
