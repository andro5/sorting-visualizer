import * as React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AlgoSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function AlgoSelect({ value, onChange }: AlgoSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[480px] h-[120px] p-[30px] m-[5">
        <SelectValue placeholder="Select algorithm" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Algorithms</SelectLabel>
          <SelectItem value="bubble">Bubble Sort</SelectItem>
          <SelectItem value="selection">Selection Sort</SelectItem>
          <SelectItem value="insertion">Insertion Sort</SelectItem>
          <SelectItem value="merge">Merge Sort</SelectItem>
          <SelectItem value="quick">Quick Sort</SelectItem>
          <SelectItem value="heap">Heap Sort</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}