import { prisma } from "@/lib/prisma";
import { getTodayAttendance } from "./actions";
import { AttendanceContent } from "@/components/attendance/attendance-content";

// Temporary fixed user ID for the demo/early functional phase
const DUMMY_USER_ID = "cl_user_123";

export default async function AttendancePage() {
    const todayAttendance = await getTodayAttendance();

    const history = await prisma.attendance.findMany({
        where: {
            userId: DUMMY_USER_ID,
        },
        orderBy: {
            date: 'desc',
        },
        take: 30, // Show last 30 days
    });

    return (
        <AttendanceContent
            todayAttendance={todayAttendance}
            history={history}
        />
    );
}
