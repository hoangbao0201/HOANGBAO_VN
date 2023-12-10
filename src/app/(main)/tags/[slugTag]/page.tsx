import { Fragment } from "react";
import { Metadata, ResolvingMetadata } from "next";

import CardBlog from "@/components/common/CardBlog";
import blogService, { GetBlogsProps } from "@/lib/services/blog.service";
import SideLeftTagDetail from "@/components/modules/Tag/SideLeftTagDetail";
import SideRightTagDetail from "@/components/modules/Tag/SideRightTagDetail";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import siteMetadata from "@/lib/siteMetadata";

type Props = {
    params: { slugTag: string }
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: "Danh sách bài viết theo chủ đề " + params.slugTag + " | " + siteMetadata.title,
        description: `Đây là danh sách bài viết theo chủ đề #${params.slugTag}.`,
        openGraph: {
            images: [`${siteMetadata.imageBlog}`, ...previousImages],
        },
    };
}

const TagDetailPage = async ({ params } : Props) => {

    const { success, blogs } : { success: boolean, blogs: GetBlogsProps[] } = await blogService.getAllBlogs({ query: `?tag=${params.slugTag}` });

    return (
        <div className="max-w-7xl w-full min-h-screen mx-auto mb-4">
            <div className="grid grid-cols-12">
                <div className="col-span-2 pt-3 h-full hidden xl:block">
                    <SideLeftTagDetail />
                </div>
                <div className="xl:col-span-7 lg:col-span-8 col-span-full pt-3">
                    {blogs && blogs.length > 0 ? (
                        <>
                            {
                                blogs.map((blog, index) => {
                                    return (
                                        <Fragment key={blog.blogId}>
                                            <CardBlog blog={blog} />
                                        </Fragment>
                                    );
                                })
                            }
                        </>
                    ) : (
                        <SkeletonCardBlog count={3} />
                    )}
                </div>
                <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3 h-full">
                    <SideRightTagDetail />
                </div>
            </div>
        </div>
    );
};

export default TagDetailPage;
