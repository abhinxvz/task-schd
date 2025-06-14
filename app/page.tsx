"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { TaskForm } from "@/components/task-form"
import { TaskList } from "@/components/task-list"
import { Footer } from "@/components/footer"
import { ShineBorder } from "@/components/ui/shine-border"

interface Task {
  id: string
  name: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showScheduleForm, setShowScheduleForm] = useState(false)

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/tasks")
      const data = await response.json()

      if (data.success) {
        setTasks(data.data)
      } else {
        setError(data.error || "Failed to fetch tasks")
      }
    } catch (err) {
      setError("Failed to fetch tasks")
    } finally {
      setIsLoading(false)
    }
  }

  const createTask = async (taskData: { name: string; description: string; dueDate?: string }) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })

      const data = await response.json()

      if (data.success) {
        setTasks((prev) => [...prev, data.data])
        setShowScheduleForm(false)
        setSelectedDate(null)
      } else {
        setError(data.error || "Failed to create task")
      }
    } catch (err) {
      setError("Failed to create task")
    } finally {
      setIsLoading(false)
    }
  }

  const updateTask = async (
    id: string,
    taskData: { name: string; description: string; completed?: boolean; dueDate?: string },
  ) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })

      const data = await response.json()

      if (data.success) {
        setTasks((prev) => prev.map((task) => (task.id === id ? data.data : task)))
      } else {
        setError(data.error || "Failed to update task")
      }
    } catch (err) {
      setError("Failed to update task")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setTasks((prev) => prev.filter((task) => task.id !== id))
      } else {
        setError(data.error || "Failed to delete task")
      }
    } catch (err) {
      setError("Failed to delete task")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleScheduleTask = (date: Date) => {
    setSelectedDate(date)
    setShowScheduleForm(true)
  }

  const handleCancelSchedule = () => {
    setShowScheduleForm(false)
    setSelectedDate(null)
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const overdueTasks = tasks.filter(
    (task) => task.dueDate && !task.completed && new Date(task.dueDate) < new Date(),
  ).length

  return (
    <main className="min-h-screen bg-black">
      <Header tasks={tasks} onDateSelect={handleDateSelect} onScheduleTask={handleScheduleTask} />

      <section className="relative pt-32 pb-16">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Streamline Your
              <br />
              Productivity
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Organize your tasks efficiently with our advanced task management system. Create, update, and track your
              progress with ease. Click on calendar dates to schedule tasks!
            </p>

            {totalTasks > 0 && (
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalTasks}</div>
                  <div className="text-sm text-gray-400">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{completedTasks}</div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{totalTasks - completedTasks}</div>
                  <div className="text-sm text-gray-400">Pending</div>
                </div>
                {overdueTasks > 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{overdueTasks}</div>
                    <div className="text-sm text-gray-400">Overdue</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <ShineBorder className="mb-8" borderClassName="border border-white/10 rounded-xl overflow-hidden">
            <TaskForm
              onSubmit={createTask}
              onCancel={showScheduleForm ? handleCancelSchedule : undefined}
              isLoading={isLoading}
              preselectedDate={showScheduleForm ? selectedDate || undefined : undefined}
            />
          </ShineBorder>

          <ShineBorder borderClassName="border border-white/10 rounded-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
              <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} isLoading={isLoading} />
            </div>
          </ShineBorder>
        </div>
      </section>

      <Footer />
    </main>
  )
}
