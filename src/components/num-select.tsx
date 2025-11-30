import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface NumSelectProps {
  numbers: number[]
  setNumbers: (nums: number[]) => void
}

export default function NumSelect({ numbers, setNumbers }: NumSelectProps) {
  const [inputValue, setInputValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    const nums = e.target.value
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n))
    setNumbers(nums)
  }

  return (
    <div className="w-[560px]">
      <Input
        type="text"
        id="numbers"
        className="w-[480px] p-[30px] m-[20px]"
        placeholder="Numbers (e.g. 1, 5, 13, 7, 6, 55)"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  )
}
