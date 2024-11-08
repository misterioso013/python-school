import { usePython } from "react-py";

export function useRunPythonCode(code: string) {
    const pyodide = usePython();
    const runCode = async () => {
        if (pyodide) {
            try {
                return await pyodide.runPython(code);
            } catch (e) {
                return e;
            }
        }
    };

    return runCode;
}