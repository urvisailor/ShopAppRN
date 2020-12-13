import Product from '../../model/product';

export const Remove_Product = 'Remove_Product';
export const Create_Product = 'Create_Product';
export const Update_product = 'Update_Product';
export const Fetch_Product = 'Fetch_Product';
export const RemoveProductFromList = (productID) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://shop-29a5b.firebaseio.com/products/${productID}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Error while Deleting');
    }
    dispatch({
      type: Remove_Product,
      Pid: productID,
    });
  };
};
export const FetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userID;
    console.log(userId);
    console.log("getstate-->",getState());

    try {
      const response = await fetch(
        'https://shop-29a5b.firebaseio.com/products.json',
      );
      const ProdLogData = await response.json();
      console.log('ID-->', ProdLogData);
      const ProdsArray = [];
      for (const key in ProdLogData) {
        ProdsArray.push(
          new Product(
            key,
            ProdLogData[key].OwnerID,
            ProdLogData[key].Title,
            ProdLogData[key].ImageUrl,
            ProdLogData[key].Description,
            ProdLogData[key].Price,
          ),
        );
      }
      dispatch({
        type: Fetch_Product,
        products: ProdsArray,
        userProducts: ProdsArray.filter((prod) => prod.OwnerID === userId),
      });
      // console.log("userproducts-->",ProdsArray.find(prod=>prod.OwnerID==userId));
    } catch (error) {
      throw error;
    }
  };
};
export const CreateProduct = (Title, ImageUrl, Description, Price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const OwnerID = getState().auth.userID;
    const response = await fetch(
      `https://shop-29a5b.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Title,
          OwnerID,
          ImageUrl,
          Description,
          Price,
        }),
      },
    );
    const ProdLogData = await response.json();
    console.log('ID-->', ProdLogData);

    if (!response.ok) {
      throw new Error('Error while Adding');
    }
    dispatch({
      type: Create_Product,
      ProductData: {
        id: ProdLogData.name,
        Title,
        ImageUrl,
        Description,
        Price,
        OwnerID: OwnerID,
      },
    });
  };
};

export const UpdateProduct = (id, Title, ImageUrl, Description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log(getState());
    const response = await fetch(
      `https://shop-29a5b.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Title,
          ImageUrl,
          Description,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Error while Updating');
    }
    dispatch({
      type: Update_product,
      pid: id,
      ProductData: {
        Title,
        ImageUrl,
        Description,
      },
    });
  };
};
