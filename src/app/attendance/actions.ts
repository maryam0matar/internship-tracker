"use server";

import { prisma } from "@/lib/prisma";
import { AttendanceStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Temporary fixed user ID for the demo/early functional phase
const DUMMY_USER_ID = "cl_user_123";

export async function checkIn(status: AttendanceStatus = "PRESENT", notes?: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    const existing = await prisma.attendance.findFirst({
        where: {
            userId: DUMMY_USER_ID,
            date: {
                gte: today,
            },
        },
    });

    if (existing) return { error: "Already checked in today" };

    // Ensure dummy user exists for the demo phase
    await prisma.user.upsert({
        where: { id: DUMMY_USER_ID },
        update: {},
        create: {
            id: DUMMY_USER_ID,
            name: "Mariam",
            email: "mariam@example.com"
        }
    });

    const record = await prisma.attendance.create({
        data: {
            userId: DUMMY_USER_ID,
            status,
            notes,
            date: new Date(),
            checkIn: new Date(),
        },
    });

    revalidatePath("/attendance");
    revalidatePath("/");
    return record;
}

export async function checkOut(id: string) {
    const record = await prisma.attendance.update({
        where: { id },
        data: {
            checkOut: new Date(),
        },
    });

    // Calculate hours if both exist
    if (record.checkIn && record.checkOut) {
        const diff = record.checkOut.getTime() - record.checkIn.getTime();
        const hours = diff / (1000 * 60 * 60);
        await prisma.attendance.update({
            where: { id },
            data: { hours },
        });
    }

    revalidatePath("/attendance");
    revalidatePath("/");
    return record;
}

export async function getTodayAttendance() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await prisma.attendance.findFirst({
        where: {
            userId: DUMMY_USER_ID,
            date: {
                gte: today,
            },
        },
    });
}
