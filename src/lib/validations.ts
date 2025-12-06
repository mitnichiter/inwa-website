import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    stock: z.coerce.number().int().min(0, "Stock must be a non-negative integer"),
    imageUrl: z.string().refine((val) => val.startsWith("/") || z.string().url().safeParse(val).success, {
        message: "Invalid image URL or path",
    }),
});

export const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});
