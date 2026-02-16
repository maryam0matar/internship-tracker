import { prisma } from "@/lib/prisma";
import { TasksContent } from "@/components/tasks/tasks-content";

export const dynamic = "force-dynamic";

// Temporary fixed user ID for the demo/early functional phase
const DUMMY_USER_ID = "cl_user_123";

export default async function TasksPage() {
    const tasks = await prisma.task.findMany({
        where: {
            userId: DUMMY_USER_ID,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return <TasksContent tasks={tasks} />;
}
