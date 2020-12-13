import PRODUCTS from '../../data/productdata';
import {
  Create_Product,
  Remove_Product,
  UpdateProduct,
  Update_product,
  Fetch_Product,
} from '../actions/Product';
import Product from '../../model/product';
const InitialState = {
  avaProducts: [],
  userProducts: [],
};

const productReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Fetch_Product:
      return {
        avaProducts: action.products,
        userProducts: action.userProducts,
      };
    case Create_Product:
      const NewProduct = new Product(
        action.ProductData.id,
        action.ProductData.OwnerId,
        action.ProductData.Title,
        action.ProductData.ImageUrl,
        action.ProductData.Description,
        action.ProductData.Price,
      );
      return {
        ...state,
        avaProducts: state.avaProducts.concat(NewProduct),
        userProducts: state.userProducts.concat(NewProduct),
      };
    case Update_product:
      const IndexVal = state.userProducts.findIndex(
        (pro) => pro.ID === action.pid,
      );
      const UpdatedProduct = new Product(
        action.pid,
        state.userProducts[IndexVal].OwnerID,
        action.ProductData.Title,
        action.ProductData.ImageUrl,
        action.ProductData.Description,
        state.userProducts[IndexVal].Price,
      );
      const UpdatedUserProducts = [...state.userProducts];
      UpdatedUserProducts[IndexVal] = UpdatedProduct;
      const IndexvalAvailable = state.avaProducts.findIndex(
        (pro) => pro.ID === action.pid,
      );
      const UpdateAvailableProducts = [...state.avaProducts];
      UpdateAvailableProducts[IndexvalAvailable] = UpdatedProduct;
      return {
        ...state,
        avaProducts: UpdateAvailableProducts,
        userProducts: UpdatedUserProducts,
      };
    case Remove_Product:
      return {
        ...state,
        userProducts: state.userProducts.filter((pro) => pro.ID != action.Pid),
        avaProducts: state.avaProducts.filter((pro) => pro.ID != action.Pid),
      };
  }
  return state;
};

export default productReducer;
