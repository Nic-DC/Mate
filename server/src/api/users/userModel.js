import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const usersSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, default: "https://picsum.photos/200/200" },
    password: { type: String, required: false },
    refreshToken: { type: String, required: false },
    isRegistered: { type: Boolean, required: false },
    chats: [{ type: Schema.Types.ObjectId, ref: "Chat", required: false }],
  },
  {
    timestamps: true,
  }
);
usersSchema.pre("save", async function (next) {
  const currentUser = this;
  console.log("this: ", this);

  if (currentUser.isModified("password")) {
    const plainPW = currentUser.password;
    const hash = await bcrypt.hash(plainPW, 11);
    currentUser.password = hash;
  }
  next();
});

usersSchema.methods.toJSON = function () {
  const userDocument = this;
  console.log("this in methods.toJSON", this);
  const user = userDocument.toObject();

  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  delete user.refreshToken;
  return user;
};

usersSchema.static("checkCredentials", async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});
export default model("User", usersSchema);
