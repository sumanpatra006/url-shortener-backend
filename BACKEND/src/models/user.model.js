import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    required: false,
    default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
});

userSchema.methods.comparePassword = async function (password) {
  return  bcrypt.compareSync(password, this.password);
};

userSchema.pre("save",async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.set("toJSON", {
  transform: function(doc,ret){
    delete ret.__v;
    delete ret.password;
    return ret;
  }
})

function getGravatarUrl(email) {
  const hash = require("crypto").createHash("md5").update(email).digest("hex");
  return `https://gravatar.com/avatar/${hash}?d=identicon`;}

const user = mongoose.model("user", userSchema);

export default user;
