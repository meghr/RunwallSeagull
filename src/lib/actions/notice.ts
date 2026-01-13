"use server";

import { prisma } from "@/lib/db";

export async function getPublicNotices(limit: number = 10) {
    try {
        const notices = await prisma.notice.findMany({
            where: {
                published: true,
                visibility: "PUBLIC",
            },
            orderBy: {
                publishedAt: "desc",
            },
            take: limit,
            select: {
                id: true,
                title: true,
                content: true,
                noticeType: true,
                attachmentUrls: true,
                publishedAt: true,
                createdBy: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return { success: true, data: notices };
    } catch (error) {
        console.error("Error fetching public notices:", error);
        return { success: false, error: "Failed to fetch notices", data: [] };
    }
}

export async function getNoticeById(id: string) {
    try {
        const notice = await prisma.notice.findUnique({
            where: { id },
            include: {
                createdBy: {
                    select: {
                        name: true,
                        role: true,
                    },
                },
            },
        });

        if (!notice) {
            return { success: false, error: "Notice not found" };
        }

        return { success: true, data: notice };
    } catch (error) {
        console.error("Error fetching notice:", error);
        return { success: false, error: "Failed to fetch notice details" };
    }
}
