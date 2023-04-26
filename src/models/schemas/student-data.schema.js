import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const bereniaStudentSchema = new Schema({
    firstName: {type: String, required: true}, // gate-house access key
    lastName: {type: String, required: true}, // estate id
    email: {type: String, required: true}, // gate-house
    mobile: {type: String, required: true},
    transactions: [
        {
            type: Schema.Types.ObjectId,
              ref: "bereniaUserPayments",
              default: null
          }
    ],
}, {
  timestamps: true
});

  bereniaStudentSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.__v;
    },
  });

  bereniaStudentSchema.plugin(mongoosePaginate);

  export const students = mongoose.model("bereniaStudents", bereniaStudentSchema);
