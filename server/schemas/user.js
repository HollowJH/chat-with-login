import z from "zod";

const userSchema = z.object({
    username: z.string().min(4).trim(),
    password: z.string()
    .min(5, "Password must be at least 5 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
})

export function validateUser(user){
    return userSchema.safeParse(user)
}