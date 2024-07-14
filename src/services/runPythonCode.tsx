import { useState, useEffect } from "react";
import { usePythonRunner } from "@/hooks/usePythonRunner";

export function runPythonCode(code: string) {
    const pyodide = usePythonRunner()
    const runCode = async () => {
        if (pyodide) {
            try{
                return await pyodide.runPythonAsync(code)
            }catch(e){
                return e
            }
        }
    }

    return runCode()
}