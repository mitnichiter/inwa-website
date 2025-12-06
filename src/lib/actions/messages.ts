"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { contactFormSchema } from "@/lib/validations";

export async function submitContactForm(data: FormData) {
    try {
        const rawData = {
            name: data.get("name"),
            email: data.get("email"),
            message: data.get("message"),
        };

        const validatedFields = contactFormSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                success: false,
                error: validatedFields.error.issues[0].message,
            };
        }

        const { name, email, message } = validatedFields.data;

        await prisma.message.create({
            data: {
                name,
                email,
                message,
                subject: "General Inquiry", // Default subject
            },
        });

        revalidatePath("/admin/messages");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to submit message:", error);
        return { success: false, error: "Failed to submit message" };
    }
}

export async function getMessages() {
    try {
        const messages = await prisma.message.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: messages };
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return { success: false, error: "Failed to fetch messages" };
    }
}
