import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import Markdown from "react-markdown";
import { Highlight, themes } from "prism-react-renderer";

const config = {
    img: ({ node, ...props }: any) => {
        return (
            // <span
            //     style={{ backgroundImage: "URL('/static/images/wrapper-image-blog.png')" }}
            //     className="bg-cover block relative rounded-lg w-full md:p-8 min-h-1/2"
            // >

            //     <span className="mx-auto">{props.alt}</span>
            // </span>
            <Image
                src={props.src}
                alt={props.alt}
                width={800}
                height={800}
                className="w-full overflow-hidden bg-white"
            />
        );
    },
    a: ({ node, href, onClick, children, ...props }: any) => {
        return (
            <Link className="text-blue-600 underline" href={href} {...props}>
                {children}
            </Link>
        );
    },
    h2: ({ node, children, ...props }: any) => {
        return (
            <h2>
                <Link href={`/`} className="">
                    {children}
                </Link>
                {/* <Link href={`/`}><span className="">#</span></Link> */}
            </h2>
        );
    },
    code: ({ node, children, ...props }: any) => {
        // const [isCopied, setIsCopied] = useState(false);
        const title = props?.className
            ? props?.className.split("language-")[1]
            : null;

        // const handleCopy = async () => {
        //     await navigator.clipboard.writeText(`${children?.trim()}`);
        //     setIsCopied(true);

        //     setTimeout(() => {
        //         setIsCopied(false);
        //     }, 3000);
        // };

        return (
            <Highlight
                theme={themes.dracula}
                code={children.trim()}
                language="tsx"
            >
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => (
                    <>
                        {title && (
                            <span className="mt-[2px] w-full flex justify-between text-sm relative">
                                <span className="pb-2 px-4 h-10 leading-10 border-b-2 border-blue-500">{title}</span>
                                <span className="bg-slate-600 h-10 block w-full rounded-tl-md border border-gray-500">
                                </span>
                                {/* <span onClick={handleCopy} className="absolute block right-2 top-1 hover:bg-white/25 cursor-pointer rounded-md">
                                    <IconCopy className={`${isCopied ? "fill-blue-600" : "fill-gray-300"} m-1`} size={25}/>
                                </span> */}
                            </span>
                        )}
                        {/* <button disabled={isCopied} onClick={copy}>
                            {isCopied ? "Copied!" : "Copy"}
                        </button> */}
                        <span className="py-4 px-4 block overflow-x-auto text-sm">
                            {tokens.map((line, i) => (
                                <span
                                    key={i}
                                    {...getLineProps({ line })}
                                    className="w-full block"
                                >
                                    {line.map((token, key) => (
                                        <span
                                            key={key}
                                            {...getTokenProps({ token })}
                                        />
                                    ))}
                                </span>
                            ))}
                        </span>
                    </>
                )}
            </Highlight>
        );
    },
};

interface MDXComponentProps {
    children: string;
}
const MDXComponent = ({ children }: MDXComponentProps) => {
    return (
        <Markdown
            components={config}
            className={
                "prose max-w-none prose-lg prose-a:no-underline prose-img:m-0 prose-img:border-none prose-pre:px-0 prose-pre:py-2"
            }
        >
            {/* prose max-w-none prose-lg prose-a:no-underline */}
            {children}
        </Markdown>
    );
};

export default MDXComponent;
