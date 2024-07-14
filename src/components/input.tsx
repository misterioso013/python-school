'use client'
import React, { useEffect, useRef, useState } from 'react'
import { SendHorizonal } from 'lucide-react'

interface InputProps {
  prompt: string | undefined
  onSubmit: (value: string) => void
}

export function Input(props: InputProps) {
  const { prompt, onSubmit } = props
  const [input, setInput] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef.current])

  return (
    <div className="mt-4 lg:w-1/2 mx-auto">
      <label
        htmlFor="input"
        className="block text-sm font-medium text-gray-700 dark:text-gray-100"
      >
        Input
      </label>
      <div className="mt-1 flex rounded-md shadow-lg">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            ref={inputRef}
            type="text"
            name="input"
            id="input"
            className="block w-full rounded-l-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500"
            placeholder={prompt}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit(input)}
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-700 dark:bg-sky-600 dark:hover:bg-sky-700"
          onClick={() => onSubmit(input)}
        >
          <SendHorizonal className="h-5 w-5 text-white" aria-hidden="true" />
          <span>Submit</span>
        </button>
      </div>
    </div>
  )
}
