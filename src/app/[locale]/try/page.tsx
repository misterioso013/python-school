'use client'
import { CodeEditor } from "@/components/codeEditor";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Try(){
  const [code, setCode] = useLocalStorage('code', '# Welcome to Python School\n# Use this editor to write and run Python code.\n\nprint("Hello, World!")')
  return <CodeEditor code={code} setCode={setCode}/>
}