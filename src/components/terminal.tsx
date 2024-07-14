'use client'
import React, { useEffect, useRef, useState } from 'react'
import { usePythonConsole } from 'react-py'
import { ConsoleState } from '@/types/console'
import { Controls } from './controls'
import { Loader } from './loader'
import { Repeat2, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const ps1 = '>>> '
const ps2 = '... '

export function Terminal() {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<{ text: string; className?: string }[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(0)

  const {
    runPython,
    stdout,
    stderr,
    banner,
    consoleState,
    isLoading,
    isRunning,
    interruptExecution,
    isAwaitingInput,
    sendInput,
    prompt
  } = usePythonConsole()

  const textArea = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    navigator.serviceWorker
      .register('/react-py-sw.js')
      .then((registration) =>
        console.log(
          'Service Worker registration successful with scope: ',
          registration.scope
        )
      )
      .catch((err) => console.log('Service Worker registration failed: ', err))
  }, [])

  useEffect(() => {
    banner && setOutput((prev) => [...prev, { text: banner + '\n' }])
  }, [banner])

  useEffect(() => {
    if (stdout) {
      setOutput((prev) => {
        // Verifica se há uma linha de entrada do usuário sem saída correspondente
        const lastOutput = prev[prev.length - 1]
        if (lastOutput && lastOutput.text.startsWith(getPrompt()) && !lastOutput.text.includes('\n')) {
          return [...prev.slice(0, -1), { text: lastOutput.text + '\n' + stdout }]
        }
        return [...prev, { text: stdout }]
      })
    }
  }, [stdout])

  useEffect(() => {
    stderr &&
      setOutput((prev) => [
        ...prev,
        { text: stderr + '\n', className: 'text-red-500' }
      ])
  }, [stderr])

  useEffect(() => {
    if (isLoading) {
      textArea.current?.blur()
    }
  }, [isLoading])

  useEffect(() => {
    if (isAwaitingInput) {
      setInput('')
      // Remove the última linha de saída, pois renderizamos o prompt
      setOutput((prev) => prev.slice(0, -1))
    }
  }, [isAwaitingInput])

  function getPrompt() {
    return isAwaitingInput
      ? prompt || ps1
      : consoleState === ConsoleState.incomplete
      ? ps2
      : ps1
  }

  async function send() {
    if (!input) return
    setCursor(0)
    setHistory((prev) => [input, ...prev])
    if (isAwaitingInput) {
      setOutput((prev) => [
        ...prev,
        { text: getPrompt() + input + '\n' }
      ])
      sendInput(input)
    } else {
      setOutput((prev) => [...prev, { text: getPrompt() + input + '\n' }])
      await runPython(input)
    }
    setInput('')
    textArea.current?.focus()
  }

  function clear() {
    setOutput([])
  }

  function reset() {
    interruptExecution()
    clear()
  }

  return (
    <div className="relative mb-10">
      <div className="absolute right-0 z-20">
        <Controls
          items={[
            {
              label: 'Clear',
              icon: Trash2,
              onClick: clear,
              disabled: isRunning
            },
            {
              label: 'Reset',
              icon: Repeat2,
              onClick: reset
            }
          ]}
        />
      </div>

      {isLoading && <Loader />}

      <pre className="z-10 max-h-[calc(100vh_-_20rem)] min-h-[18rem] text-left text-base shadow-md">
        {output.map((line, i) => (
          <code className={line.className} key={i}>
            {line.text}
          </code>
        ))}
        <div className="group relative flex items-center">
          <code className="text-gray-500">{getPrompt()}</code>
          <span className="text-gray-500 group-focus-within:hidden">|</span>
          <textarea
            ref={textArea}
            className={cn(
              'w-full resize-none rounded-md border-none bg-transparent py-2 pl-1 pr-2 !outline-none !ring-0',
              isLoading && 'pointer-events-none'
            )}
            style={{
              height: input
                ? `${input.split('\n').length * 1.5 + 1}rem`
                : '2.5rem',
              fontFamily: 'unset'
            }}
            value={input}
            onChange={(e) => {
              const value = e.target.value
              setHistory((prev) => [value, ...prev.slice(1)])
              setInput(value)
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              switch (e.key) {
                case 'Enter':
                  e.preventDefault()
                  if (!e.shiftKey) send()
                  break
                case 'ArrowUp':
                  setCursor((prev) => Math.min(history.length - 1, prev + 1))
                  setInput(history[cursor])
                  break
                case 'ArrowDown':
                  setCursor((prev) => Math.max(0, prev - 1))
                  setInput(history[cursor])
                  break
                default:
                  break
              }
            }}
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
          />
        </div>
      </pre>
    </div>
  )
}
