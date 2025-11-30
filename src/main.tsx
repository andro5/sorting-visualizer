import { useState } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { Button } from "@/components/ui/button";

import Welcoming from "./welcoming";
import AlgoSelect from "@/components/algo-select";
import NumSelect from "@/components/num-select";
import Blocks from "@/components/blocks";

// tipizirani sleep
function sleep(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

function App() {
  const [algo, setAlgo] = useState<string>("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [highlight, setHighlight] = useState<number[]>([]);
  const [running, setRunning] = useState<boolean>(false);

  const handleStart = async () => {
    if (numbers.length < 2 || !algo || running) return;
    setRunning(true);

    const arr = [...numbers];

    const swap = async (i: number, j: number) => {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setNumbers([...arr]);
      setHighlight([i, j]);
      await sleep(300);
    };

    switch (algo) {
      case "bubble":
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            setHighlight([j, j + 1]);
            await sleep(200);
            if (arr[j] > arr[j + 1]) await swap(j, j + 1);
          }
        }
        break;

      case "selection":
        for (let i = 0; i < arr.length; i++) {
          let minIdx = i;
          for (let j = i + 1; j < arr.length; j++) {
            setHighlight([minIdx, j]);
            await sleep(200);
            if (arr[j] < arr[minIdx]) minIdx = j;
          }
          if (minIdx !== i) await swap(i, minIdx);
        }
        break;

      case "insertion":
        for (let i = 1; i < arr.length; i++) {
          let key = arr[i];
          let j = i - 1;
          while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            setNumbers([...arr]);
            setHighlight([j, j + 1]);
            await sleep(200);
            j--;
          }
          arr[j + 1] = key;
          setNumbers([...arr]);
        }
        break;

      case "merge":
        async function mergeSort(start: number, end: number) {
          if (end - start <= 1) return;
          const mid = Math.floor((start + end) / 2);
          await mergeSort(start, mid);
          await mergeSort(mid, end);

          let temp: number[] = [];
          let i = start, j = mid;
          while (i < mid && j < end) {
            setHighlight([i, j]);
            await sleep(200);
            if (arr[i] < arr[j]) temp.push(arr[i++]);
            else temp.push(arr[j++]);
          }
          while (i < mid) temp.push(arr[i++]);
          while (j < end) temp.push(arr[j++]);

          for (let k = 0; k < temp.length; k++) arr[start + k] = temp[k];
          setNumbers([...arr]);
          await sleep(200);
        }
        await mergeSort(0, arr.length);
        break;

      case "quick":
        async function quickSort(low: number, high: number) {
          if (low >= high) return;
          let pivot = arr[high];
          let i = low;
          for (let j = low; j < high; j++) {
            setHighlight([j, high]);
            await sleep(200);
            if (arr[j] < pivot) {
              [arr[i], arr[j]] = [arr[j], arr[i]];
              setNumbers([...arr]);
              i++;
            }
          }
          [arr[i], arr[high]] = [arr[high], arr[i]];
          setNumbers([...arr]);
          await sleep(200);
          await quickSort(low, i - 1);
          await quickSort(i + 1, high);
        }
        await quickSort(0, arr.length - 1);
        break;

      case "heap":
        async function heapify(n: number, i: number) {
          let largest = i;
          let l = 2 * i + 1;
          let r = 2 * i + 2;

          if (l < n && arr[l] > arr[largest]) largest = l;
          if (r < n && arr[r] > arr[largest]) largest = r;

          if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            setNumbers([...arr]);
            setHighlight([i, largest]);
            await sleep(300);
            await heapify(n, largest);
          }
        }

        let n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);
        for (let i = n - 1; i > 0; i--) {
          [arr[0], arr[i]] = [arr[i], arr[0]];
          setNumbers([...arr]);
          setHighlight([0, i]);
          await sleep(300);
          await heapify(i, 0);
        }
        break;
    }

    setHighlight([]);
    setRunning(false);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <Welcoming />
      <div className="flex flex-wrap items-center gap-6">
        <AlgoSelect value={algo} onChange={setAlgo} />
        <NumSelect numbers={numbers} setNumbers={setNumbers} />
        <Button onClick={handleStart}>▶︎</Button>
      </div>
      <Blocks numbers={numbers} highlight={highlight} />
    </div>
  );
}

// sigurno dohvaćanje root elementa
const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

createRoot(container).render(<App />);
