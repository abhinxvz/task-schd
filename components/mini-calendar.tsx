"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface Task {
  id: string
  name: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
  updatedAt: string
}

interface MiniCalendarProps {
  isOpen: boolean
  onClose: () => void
  currentDate: Date
  tasks: Task[]
  onDateSelect: (date: Date) => void
  onScheduleTask: (date: Date) => void
}

export function MiniCalendar({ isOpen, onClose, currentDate, tasks, onDateSelect, onScheduleTask }: MiniCalendarProps) {
  const [displayDate, setDisplayDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setDisplayDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (day: number) => {
    return (
      currentDate.getDate() === day &&
      currentDate.getMonth() === displayDate.getMonth() &&
      currentDate.getFullYear() === displayDate.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === displayDate.getMonth() &&
      selectedDate.getFullYear() === displayDate.getFullYear()
    )
  }

  const getTasksForDate = (day: number) => {
    const dateStr = new Date(displayDate.getFullYear(), displayDate.getMonth(), day).toDateString()
    return tasks.filter((task) => {
      if (!task.dueDate) return false
      return new Date(task.dueDate).toDateString() === dateStr
    })
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day)
    setSelectedDate(clickedDate)
    onDateSelect(clickedDate)
  }

  const handleScheduleTask = () => {
    if (selectedDate) {
      onScheduleTask(selectedDate)
      onClose()
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const daysInMonth = getDaysInMonth(displayDate)
  const firstDay = getFirstDayOfMonth(displayDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  if (!isOpen) return null

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate.getDate()) : []

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full mt-2 right-1/2 transform translate-x-1/2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl z-50 min-w-[350px]"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigateMonth("prev")} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <ChevronLeft className="w-4 h-4 text-gray-300" />
        </button>
        <h3 className="text-lg font-semibold text-white">
          {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
        </h3>
        <button onClick={() => navigateMonth("next")} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Empty days for proper alignment */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-8" />
        ))}

        {/* Actual days */}
        {days.map((day) => {
          const dayTasks = getTasksForDate(day)
          const hasCompletedTasks = dayTasks.some((task) => task.completed)
          const hasPendingTasks = dayTasks.some((task) => !task.completed)

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`relative h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                isToday(day)
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : isSelected(day)
                    ? "bg-white/20 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {day}
              {/* Task indicators */}
              {dayTasks.length > 0 && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                  {hasPendingTasks && <div className="w-1 h-1 bg-yellow-400 rounded-full" />}
                  {hasCompletedTasks && <div className="w-1 h-1 bg-green-400 rounded-full" />}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="border-t border-white/10 pt-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-white">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </h4>
            <button
              onClick={handleScheduleTask}
              className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Schedule
            </button>
          </div>

          {selectedDateTasks.length > 0 ? (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {selectedDateTasks.map((task) => (
                <div
                  key={task.id}
                  className={`text-xs p-2 rounded-lg ${
                    task.completed ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  <div className="font-medium truncate">{task.name}</div>
                  <div className="text-gray-400 truncate">{task.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-400">No tasks scheduled for this date</div>
          )}
        </div>
      )}

      {/* Current Time Display */}
      <div className="border-t border-white/10 pt-4 text-center">
        <div className="text-sm text-gray-400 mb-1">Current Time</div>
        <div className="text-lg font-bold text-white tabular-nums">
          {currentDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </div>
      </div>
    </div>
  )
}
