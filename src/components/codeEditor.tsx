'use client'
import React, { useEffect, useState } from 'react'

import { Packages } from '@/types/packages'

import { usePython } from 'react-py'
import {Controls} from '@/components/controls'
import {Loader} from '@/components/loader'
import {Input} from '@/components/input'
import { python } from '@codemirror/lang-python'
import { aura } from '@uiw/codemirror-theme-aura'
import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view';
import { Repeat, PlayIcon, Square } from 'lucide-react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { DrawerTerminal } from '@/components/DrawerTerminal'

interface CodeEditorProps {
  code: string
  setCode: (value: string) => void
  packages?: Packages
}

export function CodeEditor(props: CodeEditorProps) {
  const { code, packages } = props
  const [fontSize, setFontSize] = useLocalStorage('fontSize', '16')
  const [fontFamily, setFontFamily] = useLocalStorage('fontFamily', '--font-fira-code')
  const [officialPackages, setOfficialPackages] = useState<{id: string, label: string, active: boolean}[]>([
    {id: 'asciitree', label: 'AsciiTree', active: false},
    {id: 'numpy', label: 'NumPy', active: false},
    {id: 'pandas', label: 'Pandas', active: false},
    {id: 'opencv-python', label: 'OpenCV', active: false},
    {id: 'requests', label: 'Requests', active: false},
    {id: 'scipy', label: 'SciPy', active: false},
    {id: 'matplotlib', label: 'Matplotlib', active: false},
  ])
  const [micropipPackages, setMicropipPackages] = useState<{id: string, label: string, active: boolean}[]>([
    {id: 'python-cowsay', label: 'Cowsay', active: false},
  ])

  const [showOutput, setShowOutput] = useState(false)

    const getPackages: Packages = {
        official: officialPackages.filter((pkg) => pkg.active).map((pkg) => pkg.id),
        micropip: micropipPackages.filter((pkg) => pkg.active).map((pkg) => pkg.id),
        ...packages,
    }

  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
    isAwaitingInput,
    sendInput,
    prompt,
    watchModules
  } = usePython({ packages: getPackages})

  function run() {
    const modules = (getPackages.official ?? []).concat(getPackages.micropip ?? [])
    watchModules(modules)
    runPython(code)
    setShowOutput(true)
  }

  function stop() {
    interruptExecution()
    setShowOutput(false)
  }

  function reset() {
    setShowOutput(false)
  }

  const customTheme = EditorView.theme({
    '&': {
        fontSize: `${fontSize}px`,
    },
    ".cm-content": {
        fontFamily: `var(${fontFamily})`,
        fontVariantLigatures: "common-ligatures",
        lineHeight: 1.5,
    },
})

  return (
    <div className="relative flex flex-col">
      <Controls
        items={[
          {
            label: 'Run',
            icon: PlayIcon,
            onClick: run,
            disabled: isLoading || isRunning,
            hidden: isRunning
          },
          { label: 'Stop', icon: Square, onClick: stop, hidden: !isRunning },
          {
            label: 'Reset',
            icon: Repeat,
            onClick: reset,
            disabled: isRunning
          }
        ]}
        isAwaitingInput={isAwaitingInput}
        fontSize={fontSize}
        fontFamily={fontFamily}
        setFontSize={setFontSize}
        setFontFamily={setFontFamily}
        setOfficialPackages={setOfficialPackages}
        setMicropipPackages={setMicropipPackages}
        official={officialPackages}
        micropip={micropipPackages}
      />

      {isLoading && <Loader />}

      <CodeMirror
                className='h-full w-full'
                    placeholder="Write your Python code here..."
                    value={code}
                    extensions={[python(), customTheme]}
                    indentWithTab={true}
                    theme={aura}
                    minHeight="720px" 
                    onChange={(value) => {
                        props.setCode(value)
                    }}
                />

      {isAwaitingInput && (
        <DrawerTerminal isOpen={isAwaitingInput} onClose={() => {}}>
        <Input prompt={prompt} onSubmit={sendInput} />
        </DrawerTerminal>
        )}

      {showOutput && (
        <DrawerTerminal isOpen={showOutput} onClose={() => setShowOutput(false)}>
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
            <pre className="whitespace-pre-wrap break-words text-left text-sm leading-relaxed">
              <code>{stdout}</code>
              <code className="text-red-500">{stderr}</code>
            </pre>
          </div>
        </DrawerTerminal>
      )}
    </div>
  )
}