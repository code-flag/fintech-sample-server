import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;
 
const bereniaContactSchema = new Schema({
    
      message: {type: String, required: true},
      subject: {type: String, required: true},
      email: {type: String, required: true},
      responseStatus: {type: String}
},{
  timestamps: true
});

  bereniaContactSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.__v;
    },
  });

  bereniaContactSchema.plugin(mongoosePaginate);

  export const contacts = mongoose.model("bereniaContacts", bereniaContactSchema);
