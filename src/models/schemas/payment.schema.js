import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const transactionSchema = new Schema({
    email:  {type: String, required: true},
    amount:  {type: String, required: true},
    bankCode:  {type: String, required: true},
    bankName:  {type: String, required: true},
    recipientName:  {type: String, required: true},
    accountNumber: {type: String},
    narration:  {type: String, required: true},
    reference:  {type: String, required: true},
    timeCreated: {type: String, required: false},
    paymentStatus: {
      type: String, 
      enum: ["pending", "completed", "failed"],
      required: false},
    paymentRef: {type: String, required: false},
}, {
  timestamps: true
});

  transactionSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.__v;
    },
  });

  transactionSchema.plugin(mongoosePaginate);

  export const userTransaction = mongoose.model("transactions", transactionSchema);
