import { createError } from "./utils"

export async function signInUser(email, password) {
    try {
      const validEmail = "anujsharma";
      const validPassword = "anuj1011";
  
      if (email === validEmail && password === validPassword) {
        return { success: true, message: "User signed in successfully" };
      } else {
        return { success: false, error: "Invalid email or password" };
      }
    } catch (ex) {
      return { success: false, error: ex.message || "An error occurred" };
    }
  }
  