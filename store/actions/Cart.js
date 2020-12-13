export const Add_To_Cart = 'Add-to-Cart';
export const Remove_From_Cart='RemoveItemCart';
export const ADDTOCART = (products) => {
  return {type: Add_To_Cart, products: products};
};
export const RemoveItems=(productID)=>{
  return {type:Remove_From_Cart,pid:productID};
};

