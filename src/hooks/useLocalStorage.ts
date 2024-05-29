import { useState, useEffect } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? storedValue : initialValue
    })
    useEffect(() => {

        localStorage.setItem(key, value)
    }, [value])
    return [value, setValue]
}