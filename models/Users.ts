import { prop, getModelForClass, pre, Ref } from "@typegoose/typegoose";
import bcrypt from "bcrypt";

@pre<User>("save", async function () {
  this.password = await this.hashPassword(this.password);
})
class User {
  @prop({
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: (email: string) =>
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email),
      message: "Formato de email inválido. Por favor escribe una dirección válida",
    },
  })
  email: string;

  @prop({
    required: true,
    validate: {
      validator: (password: string) => /^(?=.*[A-Z]).{8,}$/.test(password),
      message:
        "La contraseña debe contener al menos 8 caracteres y un letra mayúscula",
    },
  })
  password: string;

  @prop({ required: true, enum: ["admin", "delivery"], default: "delivery" })
  role: string;

  @prop({ ref: () => Package })
  packages: Ref<Package>[];

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}

enum PackageStatus {
  PENDING = "pendiente",
  DELIVERED = "entregado",
}

class Package {
  @prop({ required: true })
  address: string;

  @prop({ required: true })
  recipientName: string;

  @prop({ required: true })
  weightKg: number;

  @prop({ required: true })
  date: Date;

  @prop({ required: true })
  quantity: number;

  @prop({ enum: PackageStatus, default: PackageStatus.PENDING })
  status: PackageStatus;

  @prop({ ref: User })
  assignedTo: Ref<User>;
}

const UserModel = getModelForClass(User);
const PackageModel = getModelForClass(Package);

export { UserModel, PackageModel };
