import Link from "next/link";
import Image from "next/image";

import convertTime from "@/utils/convertTime";
import TagsBlog from "@/components/common/TagsBlog";
import AvatarRank from "@/components/common/AvatarRank";
import MDXComponent from "@/components/common/MDXContent";
import { GetBlogDetailProps } from "@/lib/services/blog.service";


interface ContentBlogDetailProps {
    blog: GetBlogDetailProps
}
const ContentBlogDetail = ({ blog } : ContentBlogDetailProps) => {

    return (
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
                                        src={"/static/images/default/avatar_user_sm.jpg"}
                                        className="w-12 h-12 block object-cover rounded-full flex-shrink-0"
                                    />
                                </AvatarRank>
                            </Link>
                            <div className="ml-3">
                                <div className="flex items-center mb-1">
                                    <Link href={`/user/${blog.author.username}`}>
                                        <div className="hover:underline text-lg font-medium">
                                            {blog.author.name}
                                        </div>
                                    </Link>
                                    <span className="ml-2 text-sm font-medium border border-gray-400 px-2 py-[2px] rounded-md">
                                        Cấp {blog.author.rank || 1}
                                    </span>
                                </div>
                                <Link href={`/`}>
                                    <p className="text-sm hover:underline">
                                        {convertTime(blog.createdAt)}
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <h1
                            title={blog.title}
                            className="font-extrabold text-4xl md:px-8 px-4"
                        >
                            <Link href={`/blog/${blog.slug}-${blog.blogId}`}>
                                {blog.title}
                            </Link>
                        </h1>
                        <TagsBlog
                            className="md:px-8 px-4 mt-5 mb-6"
                            listTag={blog.blogTags}
                        />
                    </header>
                    <div className="md:px-8 px-4 mb-5">
                        <MDXComponent>{blog.content}</MDXComponent>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ContentBlogDetail;
