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

export const getAllOrder = async (req, res) => {
  try {
    const orders = await schema?.Order.find()
      .populate({
        path: "storeId",
        model: schema?.Store,
      })
      .exec();

    const data = await Promise.all(
      orders?.map(async (item) => {
        const products = await schema?.OrderedProduct.find({
          orderId: item?._id,
        });
        return { orderInfo: item, products };
      })
    );
    return res.send(data);
  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: "Server error occurred." });
  }
};

export const getDueAmountForStore = async (req, res) => {
  try {
    const { storeName } = req?.query;
    const store = await schema.Store.findOne({
      storeName: storeName?.trim(),
    });

    if (!store) {
      res.send("sorry store can't found");
      return;
    }

    const orders = await schema?.Order.find({
      storeId: store?._id,
    }).select("dueAmount");

    if (!orders?.length) {
      res.send("the store are not previous order");
      return;
    }

    res.send(orders);
  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: "Server error occurred." });
  }
};
