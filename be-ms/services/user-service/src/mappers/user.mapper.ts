import { UserDocument } from "../models/user.model";
import { UserDto } from "../dto/user.dto";

export function mapUser(doc: UserDocument): UserDto {
  return {
    id: doc.userId,
    username: doc.username,
    email: doc.email,
    firstName: doc.firstName,
    lastName: doc.lastName,
    fullName: doc.fullName,
    phone: doc.phone,
    role: doc.role as UserDto["role"],
    avatarUrl: doc.avatarUrl,
    createdAt: doc.createdAt,
  };
}
