import schema from "../schema/schema.js";

export const createOrder = async (req, res) => {
  try {
    const data = req?.body;
    const storeData = data?.storeData;
    const orderData = data?.orderData;
    const productsData = data?.productsData;

    if (!Array.isArray(productsData) || !productsData?.length) {
      return res.status(400).json({ message: "Please add some products." });
    }

    if (
      !storeData?.storeName ||
      !storeData?.storeOwnerName ||
      !storeData?.storeAddress
    ) {
      return res
        .status(400)
        .json({ message: "Please provide store information properly." });
    }

    if (!orderData?.deliveryDate || !orderData?.sellsExecutiveName) {
      return res
        .status(400)
        .json({ message: "Please provide order information properly." });
    }

    let storeId = null;

    const isStoreExecute = await schema?.Store.findOne({
      storeName: storeData?.storeName,
      storeAddress: storeData?.storeAddress,
    });

    if (isStoreExecute) {
      storeId = isStoreExecute?._id;
    } else {
      const createNewStore = await schema.Store.create(storeData);
      if (createNewStore) {
        storeId = createNewStore?._id;
      } else {
        return res
          .status(400)
          .json({ message: "Request failed, please try again." });
      }
    }

    const totalAmountForOrder = productsData?.reduce(
      (a, b) => a + (b?.price && b?.quantity ? b.price * b.quantity : b?.total),
      0
    );

    orderData.totalAmount = totalAmountForOrder;
    orderData.storeId = storeId;
    orderData.deliveryDate = new Date(orderData?.deliveryDate);

    const createNewOrder = await schema.Order.create(orderData);

    if (createNewOrder) {
      const orderedProducts = productsData?.map((item) => {
        return {
          ...item,
          orderId: createNewOrder._id,
        };
      });

      const createOrderedProducts = await schema.OrderedProduct.insertMany(
        orderedProducts
      );

      if (createOrderedProducts) {
        return res.status(200).json({
          message: "Order created successfully",
          createNewOrder,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Request failed, please try again." });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Request failed, please try again." });
    }
  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: "Server error occurred." });
  }
};
