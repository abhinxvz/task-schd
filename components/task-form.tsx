"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GradientCard } from "@/components/ui/gradient-card"
import { Plus, X, Calendar } from "lucide-react"

interface TaskFormProps {
  onSubmit: (task: { name: string; description: string; dueDate?: string }) => void
  onCancel?: () => void
  initialData?: { name: string; description: string; dueDate?: string }
  isEditing?: boolean
  isLoading?: boolean
  preselectedDate?: Date
}

export function TaskForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  isLoading = false,
  preselectedDate,
}: TaskFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [dueDate, setDueDate] = useState(() => {
    if (preselectedDate) {
      return preselectedDate.toISOString().split("T")[0]
    }
    if (initialData?.dueDate) {
      return new Date(initialData.dueDate).toISOString().split("T")[0]
    }
    return ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && description.trim()) {
      onSubmit({
        name: name.trim(),
        description: description.trim(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      })
      if (!isEditing) {
        setName("")
        setDescription("")
        setDueDate("")
      }
    }
  }

  return (
    <GradientCard className="mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {isEditing
              ? "Edit Task"
              : preselectedDate
                ? `Schedule Task for ${preselectedDate.toLocaleDateString()}`
                : "Add New Task"}
          </h3>
          {isEditing && onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            required
          />
        </div>

        <div>
          <Textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[100px]"
            required
          />
        </div>

        <div>
          <div className="relative">
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Optional: Set a due date for this task</p>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={!name.trim() || !description.trim() || isLoading}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                {isEditing ? "Update Task" : "Add Task"}
              </>
            )}
          </Button>
          {isEditing && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-white/10 text-gray-300 hover:text-white"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </GradientCard>
  )
}
