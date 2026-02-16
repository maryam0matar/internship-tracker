import { prisma } from "@/lib/prisma";
import { ReportsContent } from "@/components/reports/reports-content";

export const dynamic = "force-dynamic";

// Temporary fixed user ID for the demo/early functional phase
const DUMMY_USER_ID = "cl_user_123";

export default async function ReportsPage() {
    const attendance = await prisma.attendance.findMany({
        where: {
            userId: DUMMY_USER_ID,
        },
        orderBy: {
            date: 'desc',
        },
    });

    const tasks = await prisma.task.findMany({
        where: {
            userId: DUMMY_USER_ID,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return <ReportsContent attendance={attendance} tasks={tasks} />;
}
