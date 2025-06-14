import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for tasks (shared with main route) - starting empty
const tasks: Array<{
  id: string
  name: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
  updatedAt: string
}> = []

// PUT /api/tasks/:id - Update a task
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, description, completed, dueDate } = body

    const taskIndex = tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      return NextResponse.json({ success: false, error: "Task not found" }, { status: 404 })
    }

    if (!name || !description) {
      return NextResponse.json({ success: false, error: "Name and description are required" }, { status: 400 })
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      name,
      description,
      completed: completed ?? tasks[taskIndex].completed,
      dueDate: dueDate !== undefined ? dueDate : tasks[taskIndex].dueDate,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data: tasks[taskIndex] })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update task" }, { status: 500 })
  }
}

// DELETE /api/tasks/:id - Delete a task
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const taskIndex = tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      return NextResponse.json({ success: false, error: "Task not found" }, { status: 404 })
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0]

    return NextResponse.json({ success: true, data: deletedTask })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete task" }, { status: 500 })
  }
}
