"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

import convertTime from "@/utils/convertTime";
import ContentComment from "../ContentComment";
import TagsBlog from "@/components/common/TagsBlog";
import AvatarRank from "@/components/common/AvatarRank";
import MDXContent from "@/components/common/MDXSource/MDXContent";
import { GetCommentsProps } from "@/lib/services/comment.service";
import { setCommentsBlogDetailRDHandle } from "@/redux/commentsBlogDetail";
import blogService, { GetBlogDetailProps } from "@/lib/services/blog.service";



interface ContentBlogDetailProps {
    content: any
    blog: GetBlogDetailProps;
    comments: GetCommentsProps
}
const ContentBlogDetail = ({ blog, content, comments }: ContentBlogDetailProps) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== "loading") {
            const delay = 10000;
            const timeoutId = setTimeout(() => {
                blogService.increaseView({
                    blogId: blog.blogId,
                    token: session?.backendTokens.accessToken || undefined,
                });
            }, delay);

            return () => clearTimeout(timeoutId);
        }
    }, [status]);

    useEffect(() => {
        dispatch(setCommentsBlogDetailRDHandle(comments));
    }, [])

    return (
        <>
            <div className="md:px-3">
                <div className="bg-white md:rounded-md shadow-sm overflow-hidden">
                    <article className="">
                        <header className="mb-4">
                            <div className="mb-6">
                                <Image
                                    width={800}
                                    height={800}
                                    alt="ảnh bìa"
                                    src={"/static/images/default/bg_blog_lg.png"}
                                    priority={true}
                                    className="mx-auto block max-h-80 w-full object-cover"
                                />
                            </div>
                            <div className="flex md:px-8 px-4 pt-4 mb-5">
                                <Link href={`/user/${blog.author.username}`}>
                                    <AvatarRank rank={1}>
                                        <Image
                                            width={60}
                                            height={60}
                                            alt="ảnh người dùng"
                                            src={
                                                "/static/images/default/avatar_user_sm.jpg"
                                            }
                                            className="w-12 h-12 block object-cover rounded-full flex-shrink-0"
                                        />
                                    </AvatarRank>
                                </Link>
                                <div className="ml-3">
                                    <div className="flex items-center mb-1">
                                        <Link
                                            href={`/user/${blog.author.username}`}
                                        >
                                            <div className="hover:underline text-lg font-medium">
                                                {blog.author.name}
                                            </div>
                                        </Link>
                                        <span className="ml-2 text-sm font-medium border border-gray-400 px-2 py-[2px] rounded-md">
                                            Cấp {blog.author.rank || 1}
                                        </span>
                                    </div>
                                    <div>
                                        <Link href={`/`}>
                                            <p className="text-sm hover:underline">
                                                {convertTime(blog.createdAt)}
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <h1
                                title={blog?.title}
                                className="font-extrabold text-4xl md:px-8 px-4 relative block"
                            >
                                {blog?.title}
                            </h1>
                            <TagsBlog
                                className="md:px-8 px-4 mt-5 mb-6"
                                listTag={blog.blogTags}
                            />
                        </header>
                        <div className="md:px-8 px-4 mb-5">
                            <MDXContent
                                content={content}
                            />
                            {/* <MarkdownContent
                                content={content}
                            /> */}
                            {/* { content && <MDXRemote {content} components={{}} /> } */}
                            
                            {/* {JSON.stringify(content)} */}
                            {/* <MDXContent content={content}/> */}
                        </div>
                    </article>

                </div>

                <div>
                    <ContentComment blog={blog} />
                </div>
            </div>
        </>
    );
};

export default ContentBlogDetail;
