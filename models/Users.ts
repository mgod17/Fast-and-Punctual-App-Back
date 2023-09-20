import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import bcrypt from "bcrypt";

@pre<User>("save", async function () {
    await this.hashPassword(this.password)
})

class User {
  @prop({ required: true, unique: true, trim: true })
  email: string;

  @prop({ required: true, minlength: 8 })
  password: string;

  @prop({ required: true, enum: ["admin", "delivery"], default: "delivery" })
  role: string;

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
