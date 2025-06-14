"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GradientCard } from "@/components/ui/gradient-card"
import { TaskForm } from "@/components/task-form"
import { Edit, Trash2, Check, Clock, Calendar, AlertTriangle } from "lucide-react"

interface Task {
  id: string
  name: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
  updatedAt: string
}

interface TaskListProps {
  tasks: Task[]
  onUpdate: (id: string, task: { name: string; description: string; completed?: boolean; dueDate?: string }) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export function TaskList({ tasks, onUpdate, onDelete, isLoading = false }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<string | null>(null)

  const handleEdit = (task: Task) => {
    setEditingTask(task.id)
  }

  const handleUpdate = (task: { name: string; description: string; dueDate?: string }) => {
    if (editingTask) {
      onUpdate(editingTask, task)
      setEditingTask(null)
    }
  }

  const handleToggleComplete = (task: Task) => {
    onUpdate(task.id, {
      name: task.name,
      description: task.description,
      completed: !task.completed,
      dueDate: task.dueDate,
    })
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
  }

  const isDueToday = (dueDate: string) => {
    return new Date(dueDate).toDateString() === new Date().toDateString()
  }

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Due Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Due Tomorrow"
    } else {
      return `Due ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    }
  }

  if (tasks.length === 0) {
    return (
      <GradientCard>
        <div className="text-center py-12">
          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
          <p className="text-gray-400">Create your first task to get started!</p>
        </div>
      </GradientCard>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id}>
          {editingTask === task.id ? (
            <TaskForm
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
              initialData={{ name: task.name, description: task.description, dueDate: task.dueDate }}
              isEditing={true}
              isLoading={isLoading}
            />
          ) : (
            <GradientCard>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => handleToggleComplete(task)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed ? "bg-green-500 border-green-500" : "border-gray-400 hover:border-white"
                      }`}
                    >
                      {task.completed && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
                      {task.name}
                    </h3>
                  </div>
                  <p className={`text-gray-300 mb-3 ${task.completed ? "line-through text-gray-500" : ""}`}>
                    {task.description}
                  </p>

                  {/* Due Date Display */}
                  {task.dueDate && (
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span
                        className={`text-sm ${
                          task.completed
                            ? "text-gray-500"
                            : isOverdue(task.dueDate)
                              ? "text-red-400"
                              : isDueToday(task.dueDate)
                                ? "text-yellow-400"
                                : "text-gray-300"
                        }`}
                      >
                        {formatDueDate(task.dueDate)}
                      </span>
                      {!task.completed && isOverdue(task.dueDate) && <AlertTriangle className="w-4 h-4 text-red-400" />}
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                    {task.updatedAt !== task.createdAt && (
                      <span className="ml-4">Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(task)}
                    className="text-gray-400 hover:text-white"
                    disabled={isLoading}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                    className="text-gray-400 hover:text-red-400"
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </GradientCard>
          )}
        </div>
      ))}
    </div>
  )
}
