"use server";

import prisma from "@/lib/prisma";

export async function getDashboardStats() {
    try {
        const [productCount, messageCount] = await Promise.all([
            prisma.product.count(),
            prisma.message.count(),
        ]);

        // Mocking views and inquiries for now as we don't track them in DB yet
        const views = 1234;
        const inquiries = 48;

        return {
            success: true,
            data: {
                products: productCount,
                messages: messageCount,
                views,
                inquiries,
            },
        };
    } catch (error) {
        console.error("Failed to fetch stats:", error);
        return { success: false, error: "Failed to fetch stats" };
    }
}
