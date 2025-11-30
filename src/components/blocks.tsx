import * as React from "react"

interface BlocksProps {
  numbers: number[]
  highlight?: number[]
}

export default function Blocks({ numbers, highlight = [] }: BlocksProps) {
  return (
    <div className="flex gap-2 mt-4">
      {numbers.map((num, idx) => {
        const isHighlighted = highlight.includes(idx)
        return (
          <div
            key={idx}
            className={`w-20 h-20 flex items-center justify-center border rounded ${
              isHighlighted ? "bg-red-400 text-white" : "bg-gray-200"
            }`}
          >
            {num}
          </div>
        )
      })}
    </div>
  )
}
