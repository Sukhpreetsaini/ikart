  
import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    productid: {
      type: String,
      required: true,
    },
    productqty: {
      type: String,
      required: true,
    },
    address:{
      type: String,
      required: true,
    },
    amountpaid: {
      type: String,
      required: true,
    },
    isdelivered: {
      type: Boolean,
      required: true,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order