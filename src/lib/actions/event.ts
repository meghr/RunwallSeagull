"use server";

import { prisma } from "@/lib/db";

export async function getUpcomingEvents(limit: number = 6) {
    try {
        const now = new Date();

        const events = await prisma.event.findMany({
            where: {
                published: true,
                startDate: {
                    gte: now,
                },
            },
            orderBy: {
                startDate: "asc",
            },
            take: limit,
            select: {
                id: true,
                title: true,
                description: true,
                eventType: true,
                startDate: true,
                endDate: true,
                venue: true,
                registrationRequired: true,
                registrationStartDate: true,
                registrationEndDate: true,
                maxParticipants: true,
                imageUrl: true,
                _count: {
                    select: {
                        registrations: true,
                    },
                },
            },
        });

        return { success: true, data: events };
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        return { success: false, error: "Failed to fetch events", data: [] };
    }
}

export async function getEventById(id: string) {
    try {
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                createdBy: {
                    select: {
                        name: true,
                        role: true,
                    },
                },
                _count: {
                    select: {
                        registrations: true,
                    },
                },
            },
        });

        if (!event) {
            return { success: false, error: "Event not found" };
        }

        return { success: true, data: event };
    } catch (error) {
        console.error("Error fetching event:", error);
        return { success: false, error: "Failed to fetch event details" };
    }
}

export function getEventStatus(event: any) {
    const now = new Date();

    if (!event.registrationRequired) {
        return "NO_REGISTRATION";
    }

    const regStart = event.registrationStartDate ? new Date(event.registrationStartDate) : null;
    const regEnd = event.registrationEndDate ? new Date(event.registrationEndDate) : null;

    if (regStart && now < regStart) {
        return "NOT_STARTED";
    }

    if (regEnd && now > regEnd) {
        return "CLOSED";
    }

    if (event.maxParticipants && event._count?.registrations >= event.maxParticipants) {
        return "FULL";
    }

    return "OPEN";
}
