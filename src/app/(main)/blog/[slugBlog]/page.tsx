import { Metadata, ResolvingMetadata } from "next";

import siteMetadata from "@/lib/siteMetadata";
import ContentBlogDetail from "@/components/modules/Blog/ContentBlogDetail";
import blogService, { GetBlogDetailProps } from "@/lib/services/blog.service";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import SidebarLeftBlogDetail from "@/components/modules/Blog/SideLeftBlogDetail";
import SidebarRightBlogDetail from "@/components/modules/Blog/SideRightBlogDetail";

type Props = {
    params: { slugBlog: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { success, blog } : { success: boolean, blog: GetBlogDetailProps } = await blogService.getBlogDetail(params.slugBlog);

    const previousImages = (await parent).openGraph?.images || []

    return {
        title: blog.title + " | " + siteMetadata.title,
        description: blog.summary,
        openGraph: {
            images: [`${siteMetadata.imageBlog}`, ...previousImages],
        },
    };
}

const BlogDetailPage = async ({ params }: Props) => {
    const { success, blog } = await blogService.getBlogDetail(params.slugBlog);

    return (
        <>
            {/* {blog && (
                <BlogSeo
                    title={`${blog.title} - ${siteMetadata.title}`}
                    thumbnail={blog.thumbnailUrl}
                    blogImages={blog.blogImages}
                    summary={blog.summary}
                    author={blog.author.name}
                    canonicalUrl={`${siteMetadata.siteUrl}/blog/${blog.slug}-${blog.blogId}`}
                    createdAt={blog.createdAt}
                    updatedAt={blog.updatedAt}
                />
            )} */}
            <main className="max-w-7xl w-full min-h-screen mx-auto mb-4">
                <div className="grid grid-cols-12">
                    <div className="col-span-1 xl:block hidden pt-3">
                        <SidebarLeftBlogDetail />
                    </div>

                    <div className="lg:col-span-8 col-span-full pt-3">
                        {blog ? (
                            <ContentBlogDetail blog={blog} />
                        ) : (
                            <SkeletonCardBlog count={3} />
                        )}
                    </div>

                    <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3">
                        <SidebarRightBlogDetail />
                    </div>
                </div>
            </main>
        </>
    );
};

export default BlogDetailPage;
