import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './welcoming.css'

function Welcoming() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0">
        Sorting Visualizer
      </h2>
      <p className="text-muted-foreground text-2xl">
        Sorting algorithms visualized. Implementing React, JS, Tailwindcss, Vite, shadcn/ui.
      </p>

    </>
  )
}

export default Welcoming
