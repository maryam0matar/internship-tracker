"use server";

import { prisma } from "@/lib/prisma";
import { AttendanceStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createAttendance(formData: FormData) {
    const userId = "cl_user_123"; // Skeleton/Demo user ID for now
    const status = formData.get("status") as AttendanceStatus;
    const notes = formData.get("notes") as string;
    const date = new Date(formData.get("date") as string);

    await prisma.attendance.create({
        data: {
            userId,
            status,
            notes,
            date,
            checkIn: new Date(),
        },
    });

    revalidatePath("/attendance");
}

export async function updateAttendance(id: string, checkOut: boolean = false) {
    await prisma.attendance.update({
        where: { id },
        data: checkOut ? { checkOut: new Date() } : {},
    });

    revalidatePath("/attendance");
}
