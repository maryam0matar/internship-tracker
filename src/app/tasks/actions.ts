"use server";

import { prisma } from "@/lib/prisma";
import { TaskStatus, Priority } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
    const userId = "cl_user_123";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = (formData.get("status") as TaskStatus) || "TODO";
    const priority = (formData.get("priority") as Priority) || "MEDIUM";
    const dueDate = formData.get("dueDate") ? new Date(formData.get("dueDate") as string) : null;

    // Ensure dummy user exists for the demo phase
    await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
            id: userId,
            name: "Mariam",
            email: "mariam@example.com"
        }
    });

    await prisma.task.create({
        data: {
            userId,
            title,
            description,
            status,
            priority,
            dueDate,
        },
    });

    revalidatePath("/tasks");
}

export async function updateTaskStatus(id: string, status: TaskStatus) {
    await prisma.task.update({
        where: { id },
        data: { status },
    });

    revalidatePath("/tasks");
}
