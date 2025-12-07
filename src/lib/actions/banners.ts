"use server";

import prisma from "@/lib/prisma"; // Assuming a shared prisma instance
import { revalidatePath } from "next/cache";

export async function getBanners() {
    try {
        const banners = await prisma.heroBanner.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        });
        return { success: true, data: banners };
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        return { success: false, error: "Failed to fetch banners" };
    }
}

export async function getAllBanners() {
    try {
        const banners = await prisma.heroBanner.findMany({
            orderBy: { order: "asc" },
        });
        return { success: true, data: banners };
    } catch (error) {
        console.error("Failed to fetch all banners:", error);
        return { success: false, error: "Failed to fetch banners" };
    }
}

export async function createBanner(data: {
    title?: string;
    imageUrl: string;
    link?: string;
    isActive?: boolean;
}) {
    try {
        // Get max order to append to end
        const lastBanner = await prisma.heroBanner.findFirst({
            orderBy: { order: 'desc' },
        });
        const newOrder = (lastBanner?.order ?? -1) + 1;

        const banner = await prisma.heroBanner.create({
            data: {
                ...data,
                order: newOrder,
            },
        });
        revalidatePath("/");
        revalidatePath("/admin/banners");
        return { success: true, data: banner };
    } catch (error) {
        console.error("Failed to create banner:", error);
        return { success: false, error: "Failed to create banner" };
    }
}

export async function updateBanner(
    id: number,
    data: {
        title?: string;
        imageUrl?: string;
        link?: string;
        isActive?: boolean;
        order?: number;
    }
) {
    try {
        const banner = await prisma.heroBanner.update({
            where: { id },
            data,
        });
        revalidatePath("/");
        revalidatePath("/admin/banners");
        return { success: true, data: banner };
    } catch (error) {
        console.error("Failed to update banner:", error);
        return { success: false, error: "Failed to update banner" };
    }
}

export async function deleteBanner(id: number) {
    try {
        await prisma.heroBanner.delete({
            where: { id },
        });
        revalidatePath("/");
        revalidatePath("/admin/banners");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete banner:", error);
        return { success: false, error: "Failed to delete banner" };
    }
}

export async function reorderBanners(
    items: { id: number; order: number }[]
) {
    try {
        const transaction = items.map((item) =>
            prisma.heroBanner.update({
                where: { id: item.id },
                data: { order: item.order },
            })
        );
        await prisma.$transaction(transaction);
        revalidatePath("/");
        revalidatePath("/admin/banners");
        return { success: true };
    } catch (error) {
        console.error("Failed to reorder banners:", error);
        return { success: false, error: "Failed to reorder banners" };
    }
}
