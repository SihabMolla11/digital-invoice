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
      return res.status(400).json({ message: "sorry store can't found" });
    }

    const orders = await schema?.Order.find({
      storeId: store?._id,
    }).select("dueAmount");

    if (!orders?.length) {
      return res
        .status(400)
        .json({ message: "the store are not previous order" });
    }

    res.send({ orders });
  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: "Server error occurred." });
  }
};

export const getAllStore = async (req, res) => {
  try {
    const stores = await schema.Store.find().select("storeName");

    if (!stores?.length) {
      return res.status(400).json({ message: "Not Found Store" });
    }

    res.send(stores);
  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: "Server error occurred." });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await schema?.Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.send({
      message: "Order deleted successfully.",
      order: deletedOrder,
    });
  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: "Server error occurred." });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedOrder = await schema?.Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.send({ message: "Order updated successfully.", order: updatedOrder });
  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({ message: "Server error occurred." });
  }
};
