import { Schema, model, models, Document } from 'mongoose'

const OrderSchema = new Schema({
    createdAt: {
      type: Date,
      default: Date.now,
    },
    stripeId: {
      type: String,
      required: true,
      unique: true,
    },
    totalAmount: {
      type: String,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  })
  
  const Order = models.Order || model('Order', OrderSchema)
  
  export default Order