import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for tasks - starting empty
const tasks: Array<{
  id: string
  name: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
  updatedAt: string
}> = []

// GET /api/tasks - Retrieve all tasks
export async function GET() {
  try {
    return NextResponse.json({ success: true, data: tasks })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch tasks" }, { status: 500 })
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, dueDate } = body

    if (!name || !description) {
      return NextResponse.json({ success: false, error: "Name and description are required" }, { status: 400 })
    }

    const newTask = {
      id: Date.now().toString(),
      name,
      description,
      completed: false,
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    tasks.push(newTask)

    return NextResponse.json({ success: true, data: newTask }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create task" }, { status: 500 })
  }
}
