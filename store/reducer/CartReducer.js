import {Add_To_Cart, Remove_From_Cart} from '../actions/Cart';
import CartItems from '../../model/cartItems';
import {Add_Order} from '../actions/Order';
import {Remove_Product} from '../actions/Product';
const InitialState = {
  Items: {},
  TotAmt: 0,
};
const CartReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Add_To_Cart:
      const cartItems = action.products;
      const CartItemPrice = cartItems.Price;
      const CartItemTitle = cartItems.Title;
      let UpdatedItem;
      if (state.Items[cartItems.ID]) {
        UpdatedItem = new CartItems(
          state.Items[cartItems.ID].qty + 1,
          CartItemTitle,
          CartItemPrice,
          state.Items[cartItems.ID].sum + CartItemPrice,
        );
      } else {
        UpdatedItem = new CartItems(
          1,
          CartItemTitle,
          CartItemPrice,
          CartItemPrice,
        );
      }
      return {
        ...state,
        Items: {...state.Items, [cartItems.ID]: UpdatedItem},
        TotAmt: parseInt(state.TotAmt + CartItemPrice),
      };
    case Remove_From_Cart:
      const cartitem = state.Items[action.pid];
      const currqty = cartitem.qty;
      let updatedcart;
      if (currqty > 1) {
        const updateItem = new CartItems(
          cartitem.qty - 1,
          cartitem.title,
          cartitem.price,
          cartitem.sum - cartitem.price,
        );
        updatedcart = {
          ...state.Items,
          [action.pid]: updateItem,
        };
      } else {
        updatedcart = {...state.Items};
        delete updatedcart[action.pid];
      }
      return {
        ...state,
        Items: updatedcart,
        TotAmt: parseInt(state.TotAmt - cartitem.price),
      };
    case Add_Order:
      return InitialState;
    case Remove_Product:
      if (!state.Items[action.Pid]) {
        return state;
      }
      const UpdatedProduct = {...state.Items};
      delete UpdatedProduct[action.Pid];
      return {
        ...state,
        Items: UpdatedProduct,
        TotAmt: parseInt(state.TotAmt - state.Items[action.Pid].sum),
      };
  }
  return state;
};
export default CartReducer;
