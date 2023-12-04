import { GetStaticPaths, GetStaticProps } from "next";

import blogService, { GetBlogDetailProps } from "@/lib/services/blog.service";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import SidebarLeftBlogDetail from "@/components/modules/Blog/SideLeftBlogDetail";
import SidebarRightBlogDetail from "@/components/modules/Blog/SideRightBlogDetail";
import ContentBlogDetail from "@/components/modules/Blog/ContentBlogDetail";

type Props = {
    params: { slugBlog: string }
}
const BlogDetailPage = async ({ params } : Props) => {

    const { success, blog } = await blogService.getBlogDetail(params.slugBlog);

    console.log(blog)

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