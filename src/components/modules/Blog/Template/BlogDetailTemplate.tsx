"use client"

import { useDispatch } from "react-redux";
import { GetBlogDetailProps } from "@/lib/services/blog.service";
import { GetCommentsProps } from "@/lib/services/comment.service";
import { setCommentsBlogDetailRDHandle } from "@/redux/commentsBlogDetail";
import ContentBlogDetail from "@/components/modules/Blog/ContentBlogDetail";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import SidebarLeftBlogDetail from "@/components/modules/Blog/SideLeftBlogDetail";
import SidebarRightBlogDetail from "@/components/modules/Blog/SideRightBlogDetail";


interface BlogDetailTemplateProps {
    blog: GetBlogDetailProps
    comments: GetCommentsProps[]
}
const BlogDetailTemplate = ({ blog, comments }: BlogDetailTemplateProps) => {
    
    const dispatch = useDispatch();
    dispatch(setCommentsBlogDetailRDHandle(comments));

    return (
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
    )
}

export default BlogDetailTemplate;