import Order from '../../model/order';
export const Add_Order = 'Add_Order';
export const Load_Order = 'Load_Order';
export const LoadOrder = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userID;
    const response = await fetch(
      `https://shop-29a5b.firebaseio.com/Orders/${userId}.json?auth=${token}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Error while Adding Order');
    }

    const data = await response.json();
    const OrdersArray = [];
    for (const key in data) {
      OrdersArray.push(
        new Order(
          key,
          data[key].cartitems,
          data[key].amount,
          new Date(data[key].date),
        ),
      );
    }

    dispatch({
      type: Load_Order,
      Orders: OrdersArray,
    });
  };
};
export const ADDORDER = (cartitems, amount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userID;
    const date = new Date();
    const response = await fetch(
      `https://shop-29a5b.firebaseio.com/Orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartitems,
          amount,
          date: date.toISOString(),
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Error while Adding Order');
    }

    const data = await response.json();
    dispatch({
      type: Add_Order,
      CartOrder: {
        id: data.name,
        items: cartitems,
        totalamt: amount,
        date: date,
      },
    });
  };
};
