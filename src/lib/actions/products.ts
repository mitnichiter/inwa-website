"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { productSchema } from "@/lib/validations";

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: products };
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { success: false, error: "Failed to fetch products" };
    }
}

export async function createProduct(data: FormData) {
    try {
        const rawData = {
            name: data.get("name"),
            price: data.get("price"),
            description: data.get("description"),
            stock: data.get("stock"),
            imageUrl: data.get("imageUrl"),
        };

        const validatedFields = productSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                success: false,
                error: validatedFields.error.issues[0].message,
            };
        }

        const { name, price, description, stock, imageUrl } = validatedFields.data;

        await prisma.product.create({
            data: {
                name,
                price,
                description,
                stock,
                imageUrl,
                status: stock > 0 ? "Active" : "Out of Stock",
            },
        });

        revalidatePath("/admin/products");
        revalidatePath("/products");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create product:", error);
        return { success: false, error: "Failed to create product" };
    }
}

export async function deleteProduct(id: number) {
    try {
        await prisma.product.delete({
            where: { id },
        });

        revalidatePath("/admin/products");
        revalidatePath("/products");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, error: "Failed to delete product" };
    }
}

export async function updateProduct(id: number, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name"),
            price: formData.get("price"),
            description: formData.get("description"),
            stock: formData.get("stock"),
            imageUrl: formData.get("imageUrl"),
        };

        const validatedFields = productSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                success: false,
                error: validatedFields.error.issues[0].message,
            };
        }

        const { name, price, description, stock, imageUrl } = validatedFields.data;

        await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                stock,
                imageUrl,
                status: stock > 0 ? "Active" : "Out of Stock",
            },
        });

        revalidatePath("/admin/products");
        revalidatePath("/products");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, error: "Failed to update product" };
    }
}
