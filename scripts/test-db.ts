
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Testing database connection...')
    try {
        await prisma.$connect()
        console.log('Successfully connected to the database.')

        // Check if Attendance table exists
        const attendanceCount = await prisma.attendance.count()
        console.log(`Attendance count: ${attendanceCount}`)

        // Check if Task table exists
        const taskCount = await prisma.task.count()
        console.log(`Task count: ${taskCount}`)

        console.log('Database schema appears to be in sync.')
    } catch (error: any) {
        console.error('Database connection failed!')
        console.error('Error Code:', error.code)
        console.error('Error Message:', error.message)
        if (error.code === 'P2021') {
            console.error('Hint: The table does not exist in the current database. Run npx prisma db push.')
        }
    } finally {
        await prisma.$disconnect()
    }
}

main()
