"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { MiniCalendar } from "@/components/mini-calendar"
import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"

interface Task {
  id: string
  name: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
  updatedAt: string
}

interface HeaderProps {
  tasks: Task[]
  onDateSelect: (date: Date) => void
  onScheduleTask: (date: Date) => void
}

export function Header({ tasks, onDateSelect, onScheduleTask }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen)
  }

  const closeCalendar = () => {
    setIsCalendarOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-black/50">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-4">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-bold text-white tracking-tight">T4SKx</span>
          </Link>
        </div>
        <div className="relative">
          <button
            onClick={toggleCalendar}
            className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
              <div className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
                {formatDate(currentTime)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
              <div className="text-lg font-bold text-white tabular-nums">{formatTime(currentTime)}</div>
            </div>
          </button>

          <MiniCalendar
            isOpen={isCalendarOpen}
            onClose={closeCalendar}
            currentDate={currentTime}
            tasks={tasks}
            onDateSelect={onDateSelect}
            onScheduleTask={onScheduleTask}
          />
        </div>
        <div className="w-24"></div> {/* Spacer to balance the layout */}
      </div>
    </header>
  )
}
