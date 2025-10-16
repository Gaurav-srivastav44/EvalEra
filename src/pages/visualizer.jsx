import React, { useState } from "react";

export default function Visualizer() {
  const [topic, setTopic] = useState("sorting");
  const [algorithm, setAlgorithm] = useState("bubble");
  const [array, setArray] = useState([5, 3, 8, 1, 2]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const sortingAlgorithms = {
    bubble: (arr) => {
      let a = [...arr];
      let s = [];
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
          if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
          s.push([...a]);
        }
      }
      return s;
    },
    selection: (arr) => {
      let a = [...arr];
      let s = [];
      for (let i = 0; i < a.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < a.length; j++) {
          if (a[j] < a[minIdx]) minIdx = j;
        }
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        s.push([...a]);
      }
      return s;
    },
    insertion: (arr) => {
      let a = [...arr];
      let s = [];
      for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;
        while (j >= 0 && a[j] > key) {
          a[j + 1] = a[j];
          j--;
          s.push([...a]);
        }
        a[j + 1] = key;
        s.push([...a]);
      }
      return s;
    },
    quick: (arr) => {
      let a = [...arr];
      let s = [];
      const quickSort = (low, high) => {
        if (low < high) {
          let pi = partition(low, high);
          quickSort(low, pi - 1);
          quickSort(pi + 1, high);
        }
      };
      const partition = (low, high) => {
        let pivot = a[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
          if (a[j] < pivot) {
            i++;
            [a[i], a[j]] = [a[j], a[i]];
          }
          s.push([...a]);
        }
        [a[i + 1], a[high]] = [a[high], a[i + 1]];
        s.push([...a]);
        return i + 1;
      };
      quickSort(0, a.length - 1);
      return s;
    },
    merge: (arr) => {
      let a = [...arr];
      let s = [];
      const mergeSort = (l, r) => {
        if (l >= r) return;
        const m = Math.floor((l + r) / 2);
        mergeSort(l, m);
        mergeSort(m + 1, r);
        mergeArrays(l, m, r);
      };
      const mergeArrays = (l, m, r) => {
        let left = a.slice(l, m + 1);
        let right = a.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
          if (left[i] <= right[j]) a[k++] = left[i++];
          else a[k++] = right[j++];
          s.push([...a]);
        }
        while (i < left.length) { a[k++] = left[i++]; s.push([...a]); }
        while (j < right.length) { a[k++] = right[j++]; s.push([...a]); }
      };
      mergeSort(0, a.length - 1);
      return s;
    }
  };

  const handleVisualize = () => {
    if (topic === "sorting") {
      const generatedSteps = sortingAlgorithms[algorithm](array);
      setSteps(generatedSteps);
      setCurrentStep(0);
    }
  };

  const nextStep = () => { if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-cyan-200 text-gray-900 p-6 md:p-20 mt-10 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-br from-cyan-700 to-blue-700 bg-clip-text text-transparent">
        DSA Visualizer Hub
      </h1>

      <p className="text-gray-700 mb-6 max-w-2xl text-center">
        Choose a topic, algorithm, modify the input, and visualize the steps.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-cyan-500 focus:outline-none text-gray-900">
          <option value="sorting">Sorting</option>
          <option value="recursion">Recursion</option>
          <option value="stack">Stack</option>
          <option value="queue">Queue</option>
          <option value="tree">Tree</option>
          <option value="graph">Graph</option>
        </select>

        {topic === "sorting" && (
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-cyan-500 focus:outline-none text-gray-900">
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
          </select>
        )}

        {topic === "sorting" && (
          <input type="text" value={array.join(",")} onChange={(e) => setArray(e.target.value.split(",").map(Number))} className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-cyan-500 focus:outline-none text-gray-900 w-64" placeholder="Enter array, e.g., 5,3,8,1,2" />
        )}

        <button onClick={handleVisualize} className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          Visualize
        </button>
      </div>

      {steps.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 mb-4">
            {steps[currentStep].map((num, idx) => (
              <div key={idx} className="w-12 h-12 flex items-center justify-center bg-cyan-500 text-white font-bold rounded">
                {num}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button onClick={prevStep} className="px-4 py-2 bg-gray-300 text-gray-900 rounded-full hover:bg-gray-200 transition">Previous</button>
            <button onClick={nextStep} className="px-4 py-2 bg-gray-300 text-gray-900 rounded-full hover:bg-gray-200 transition">Next</button>
          </div>
          <p className="mt-2 text-gray-600">Step {currentStep + 1} of {steps.length}</p>
        </div>
      )}
    </div>
  );
}
