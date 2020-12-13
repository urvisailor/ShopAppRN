import Order from '../../model/order';
import {Add_Order, Load_Order} from '../actions/Order';
const initialstate = {
  orders: [],
};

const OrderReducer = (state = initialstate, action) => {
  switch (action.type) {
    case Load_Order:
      return {
        orders:action.Orders
      }
    case Add_Order:
      const OrderObj = new Order(
        action.CartOrder.id,
        action.CartOrder.items,
        action.CartOrder.totalamt,
        action.CartOrder.date,
      );
      return{
          ...state,
          orders:state.orders.concat(OrderObj)
      }
  }
  return state;
};

export default OrderReducer;
