import { ClipboardCheckIcon, Clipboard } from "lucide-react"
import { useState } from "react"
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {materialDark} from "react-syntax-highlighter/dist/esm/styles/prism"
import Markdown from 'react-markdown'

export function Code({textMarkdwon} : {textMarkdwon: string}) {
    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            children={textMarkdwon}
            components={{
                code(props) {
                    const {children, className, node, ref, ...rest} = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                    <div className="relative">
                        <div className="absolute top-2 right-2">
                            <CodeClipboard>{children}</CodeClipboard>
                        </div>
                    <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={materialDark}
                        showLineNumbers={true}
                        wrapLines={true}
                        lineProps={(lineNumber) => ({
                            style: {display: 'block'}
                        })}
                    />
                    </div>
                    ) : (
                    <code {...rest} className={className}>
                        {children}
                    </code>
                    )
                }
                }}
        />
    )
}

function CodeClipboard({children}: {children: React.ReactNode}) {
    const [copied, setCopied] = useState(false)
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(children?.toString() || '')
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }
    return (
        <div className="flex flex-row gap-2">
            {
                copied ? (
                    <ClipboardCheckIcon className="text-green-500 z-10" />
                ) : (
                    <Clipboard className="text-gray-500 z-10" onClick={copyToClipboard} />
                )
            }
        </div>
    )
}