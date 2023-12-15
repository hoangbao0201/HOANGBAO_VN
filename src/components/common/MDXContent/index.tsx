import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { Highlight, themes } from "prism-react-renderer";
import IconCopy from "@/components/modules/icons/IconCopy";

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
        const title = props?.className ? props?.className.split("language-")[1] : null;
        
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
                            {
                                title && <div className="border-b pb-2 px-4 flex items-center justify-between">
                                    <span>{title}</span>
                                    <i onClick={() => navigator.clipboard.writeText(`${children.trim()}`)} className="hover:bg-white/25 cursor-pointer p-2 rounded-full">
                                        <IconCopy className="fill-white block"/>
                                    </i>
                                </div>
                            }
                            <div className="py-4 px-4">
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })}>
                                        {line.map((token, key) => (
                                            <span
                                                key={key}
                                                {...getTokenProps({ token })}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </>
                )}
            </Highlight>
        );
    },
    inlineCode: ({ node, children, ...props }: any) => {
        return (
            <>
                <Link href={`/`} className="">
                    {children}
                </Link>
            </>
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
                "prose text-gray-800 max-w-none prose-lg prose-a:no-underline prose-img:m-0 prose-img:border-none prose-pre:px-0 prose-pre:py-2"
            }
        >
            {/* prose max-w-none prose-lg prose-a:no-underline */}
            {children}
        </Markdown>
    );
};

export default MDXComponent;
