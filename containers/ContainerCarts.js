const User = require("../models/user");

class ContainerCarts {
  async getCart(userId) {
    try {
      const data = await User.findById(userId);
      return { cart: data.cart };
    } catch (error) {
      throw { message: `Something have gone wrong. ${error}` };
    }
  }

  async postCart(userId, dataProduct) {
    try {
      const data = await User.findById(userId);
      let cart = [...data.cart];
      if (cart.length) {
        const findProduct = data.cart.findIndex(
          (item) => item.productId === dataProduct.productId
        );
        findProduct === -1
          ? cart = [...cart, dataProduct]
          : cart[findProduct] = dataProduct
      }else{
        cart = [...cart,dataProduct]
      }
      const query = {
        $set:{
          cart
        }
      }
      const newData = await User.findByIdAndUpdate(userId, query, {
        new: true,
      });
      return { message:"Successfully created", dataUser:newData }

    } catch (error) {
      throw { message: `Something have gone wrong cuate. ${error}` };
    }
  }

  // async updateCart(userId, dataProduct) {
  //   try {
  //     const queryUpdate = {
  //       $push: {
  //         cart: dataProduct,
  //       },
  //     };
  //     const data = await User.findByIdAndUpdate(userId, queryUpdate, {
  //       new: true,
  //     });
  //     return { cart: data.cart };
  //   } catch (error) {
  //     throw { message: `Something have gone wrong. ${error}` };
  //   }
  // }

  async deleteProductCart(userId, productId) {
    try {
      const queryDelete = {
        $pull: {
          cart: {
            productId,
          },
        },
      };
      const data = await User.findByIdAndUpdate(userId, queryDelete, {
        new: true,
      });
      return { dataUser: data };
    } catch (error) {
      throw { message: `Something have gone wrong. ${error}` };
    }
  }
}

module.exports = ContainerCarts;
