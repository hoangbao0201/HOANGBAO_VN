import Link from "next/link";
import Image from "next/image";
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
        return (
            <Highlight
                theme={themes.dracula}
                code={children}
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
                "prose text-gray-800 max-w-none prose-lg prose-a:no-underline prose-img:m-0 prose-img:border-none"
            }
        >
            {/* prose max-w-none prose-lg prose-a:no-underline */}
            {children}
        </Markdown>
    );
};

export default MDXComponent;
