import { createSelector } from "reselect";

const appName = "rr2";
export const moduleName = "products";
/**
 * Constants
 */
const FETCH_PRODUCTS_REQUEST = `${appName}/${moduleName}/FETCH_PRODUCTS/REQUEST`;
const FETCH_PRODUCTS_SUCCESS = `${appName}/${moduleName}/FETCH_PRODUCTS/SUCCESS`;
const FETCH_PRODUCTS_FAILURE = `${appName}/${moduleName}/FETCH_PRODUCTS/FAILURE`;

const FETCH_ONE_REQUEST = `${appName}/${moduleName}/FETCH_ONE/REQUEST`;
const FETCH_ONE_SUCCESS = `${appName}/${moduleName}/FETCH_ONE/SUCCESS`;
const FETCH_ONE_FAILURE = `${appName}/${moduleName}/FETCH_ONE/FAILURE`;

const SAVE_NEW_REQUEST = `${appName}/${moduleName}/SAVE_NEW/REQUEST`;
const SAVE_NEW_SUCCESS = `${appName}/${moduleName}/SAVE_NEW/SUCCESS`;
const SAVE_NEW_FAILURE = `${appName}/${moduleName}/SAVE_NEW/FAILURE`;

const SAVE_REQUEST = `${appName}/${moduleName}/SAVE/REQUEST`;
const SAVE_SUCCESS = `${appName}/${moduleName}/SAVE/SUCCESS`;
const SAVE_FAILURE = `${appName}/${moduleName}/SAVE/FAILURE`;

const DELETE_PRODUCT_REQUEST = `${appName}/${moduleName}/DELETE_PRODUCT/REQUEST`;
const DELETE_PRODUCT_SUCCESS = `${appName}/${moduleName}/DELETE_PRODUCT/SUCCESS`;
const DELETE_PRODUCT_FAILURE = `${appName}/${moduleName}/DELETE_PRODUCT/FAILURE`;

/**
 * Action Creators
 */
export const fetchProducts = page => async (dispatch, _getState, { api }) => {
  dispatch({
    type: FETCH_PRODUCTS_REQUEST
  });
  try {
    const data = await api.products.getAll(page);
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error
    });
  }
};

export const deleteProduct = product => async (
  dispatch,
  _getState,
  { api }
) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });

  try {
    await api.products.deleteOne(product);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: product });
    return true;
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error });
    return false;
  }
};

export const fetchProduct = id => async (dispatch, _getState, { api }) => {
  dispatch({
    type: FETCH_ONE_REQUEST,
    payload: id
  });
  try {
    const data = await api.products.getOne(id);
    dispatch({
      type: FETCH_ONE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_ONE_FAILURE,
      payload: error
    });
  }
};

export const saveNewProduct = newProduct => async (
  dispatch,
  _getState,
  { api }
) => {
  dispatch({
    type: SAVE_NEW_REQUEST
  });
  try {
    const product = await api.products.saveNew(newProduct);

    dispatch({
      type: SAVE_NEW_SUCCESS,
      payload: product
    });
    return product;
  } catch (error) {
    dispatch({
      type: SAVE_NEW_FAILURE,
      payload: error
    });
  }
};

export const saveProduct = editProduct => async (
  dispatch,
  _getState,
  { api }
) => {
  dispatch({
    type: SAVE_REQUEST
  });
  try {
    const product = await api.products.save(editProduct);

    dispatch({
      type: SAVE_SUCCESS,
      payload: product
    });
    return product;
  } catch (error) {
    dispatch({
      type: SAVE_FAILURE,
      payload: error
    });
  }
};

/**
 * Default state
 */
export const defaultState = {
  isLoading: false,
  list: [],
  total: 1,
  page: 1,
  limit: 1,
  one: null
};

/**
 * Reducer
 */
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        list: []
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload.list,
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit
      };
    case FETCH_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
        one: null
      };
    case FETCH_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        one: action.payload
      };

    default:
      return state;
  }
}

/**
 * Selectors
 */

export const stateSelector = state => state[moduleName];

export const productsSelector = createSelector(
  stateSelector,
  state => state.list
);
export const productSelector = createSelector(
  stateSelector,
  state => state.one
);
export const isLoadingSelector = createSelector(
  stateSelector,
  state => state.isLoading
);
export const totalPageSelector = createSelector(
  stateSelector,
  state => Math.ceil(state.total / state.limit)
);
