"use client"

import { useEffect, useRef, useState } from "react"

interface TimerProps {
  duration: number
  onExpire: () => void
  running: boolean
}

export default function Timer({ duration, onExpire, running }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const expiredRef = useRef(false)

  useEffect(() => {
    setTimeLeft(duration)
    expiredRef.current = false
  }, [duration])

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true
        onExpire()
      }
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, running, onExpire])

  const pct = timeLeft / duration
  const radius = 28
  const circ = 2 * Math.PI * radius
  const dash = circ * pct

  const color =
    timeLeft > 30 ? "#16A34A" : timeLeft > 15 ? "#D97706" : "#DC2626"

  return (
    <div
      className="relative flex items-center justify-center w-16 h-16"
      role="timer"
      aria-label={`${timeLeft} segundos restantes`}
      aria-live="off"
    >
      <svg width="64" height="64" className="-rotate-90">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={circ - dash}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s" }}
        />
      </svg>
      <span
        className="absolute text-xl font-extrabold"
        style={{ color }}
      >
        {timeLeft}
      </span>
    </div>
  )
}
