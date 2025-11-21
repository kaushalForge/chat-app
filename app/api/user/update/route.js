import { updateUser } from "@/controllers/userController";
import { isLoggedIn } from "@/utils/authorization";

export const POST = isLoggedIn(updateUser);
