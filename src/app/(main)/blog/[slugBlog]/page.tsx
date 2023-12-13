import { Metadata, ResolvingMetadata } from "next";

import siteMetadata from "@/lib/siteMetadata";
import blogService, { GetBlogDetailProps } from "@/lib/services/blog.service";

import commentService from "@/lib/services/comment.service";
import BlogDetailTemplate from "@/components/modules/Blog/Template/BlogDetailTemplate";

type Props = {
    params: { slugBlog: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { success, blog }: { success: boolean; blog: GetBlogDetailProps } =
        await blogService.getBlogDetail({
            query: params.slugBlog,
            next: { revalidate: 3 * 60 * 60 },
        });

    const previousImages = (await parent).openGraph?.images || [];

    const listImagesBlog =
        blog?.blogImages.length > 0
            ? blog.blogImages.map((image) => image.urlImage)
            : [siteMetadata.imageBlog];

    return {
        title: blog?.title + " | " + siteMetadata.title,
        description: blog?.summary,
        openGraph: {
            images: [...listImagesBlog, ...previousImages],
        },
    };
}

const BlogDetailPage = async ({ params }: Props) => {
    const { blog } = await blogService.getBlogDetail({
        query: params.slugBlog,
        next: { revalidate: 3 * 60 * 60 },
    });
    const { comments } = await commentService.getComments({
        query: `?blogId=${
            params.slugBlog.replace(/.*[^0-9]/, '')
        }`,
        next: { revalidate: 3 * 60 * 60 },
    });

    return (
        <>
            <BlogDetailTemplate blog={blog} comments={comments}/>
        </>
    );
};

export default BlogDetailPage;
