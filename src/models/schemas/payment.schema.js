import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const bereniaPaymentSchema = new Schema({
    firstName: {type: String, required: true}, // gate-house access key
    lastName: {type: String, required: true}, // estate id
    email: {type: String, required: true}, // gate-house
    mobile: {type: String, required: true},
    paymentRef: {type: String, required: false},
    amount: {type: Number, required: true},
    timeCreated: {type: String, required: false},
    paymentStatus: {type: String, required: false},
    courseTitle: {type: String, required: false},
}, {
  timestamps: true
});

  bereniaPaymentSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.__v;
    },
  });

  bereniaPaymentSchema.plugin(mongoosePaginate);

  export const userPayment = mongoose.model("bereniaUserPayments", bereniaPaymentSchema);
