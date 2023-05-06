import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {type: String, required: true}, // gate-house access key
    lastName: {type: String, required: true}, // estate id
    email: {type: String, required: true}, // gate-house
    mobile: {type: String, required: true},
    balance: {type: Number, default: 50000},
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    transactions: [
        {
            type: Schema.Types.ObjectId,
              ref: "transactions",
              default: null
          }
    ],
}, {
  timestamps: true
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  }

  next();
});

UserSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.encryptPassword = async function encryptPassword(password) {
  const saltRounds = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  return bcrypt.hash(password, saltRounds);
};

  UserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.__v;
    },
  });

  UserSchema.plugin(mongoosePaginate);

  export const users = mongoose.model("users", UserSchema);
