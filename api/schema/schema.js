import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },

  storeOwnerName: {
    type: String,
    required: true,
  },

  storeAddress: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Store = mongoose.model("store", storeSchema);

const ordersSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
    required: true,
  },

  deliveryDate: {
    type: Date,
    required: true,
  },

  sellsExecutiveName: {
    type: String,
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  advancedAmount: {
    type: Number,
    required: true,
  },

  dueAmount: {
    type: Number,
    required: true,
  },

  orderStatus: {
    type: String,
    enum: ["pending", "inprogress", "delivered", "cancel"],
    default: "pending",
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("order", ordersSchema);

const orderedProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const OrderedProduct = mongoose.model("orderedProduct", orderedProductSchema);

const schema = { Store, OrderedProduct, Order };

export default schema;
