import { useState, useEffect } from "react";
import { usePython } from "react-py";

export function runPythonCode(code: string) {
    const pyodide = usePython()
    const runCode = async () => {
        if (pyodide) {
            try{
                return await pyodide.runPython(code)
            }catch(e){
                return e
            }
        }
    }

    return runCode()
}