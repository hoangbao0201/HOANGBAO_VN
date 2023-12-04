import { Metadata } from "next";
import { Fragment } from "react";

import siteMetadata from "@/lib/siteMetadata";
import CardBlog from "@/components/common/CardBlog";
import SideLeftHome from "@/components/modules/Home/SideLeftHome";
import SideRightHome from "@/components/modules/Home/SideRightHome";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import blogService, { GetBlogsProps } from "@/lib/services/blog.service";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Trang chủ | " + siteMetadata.title,
        description: siteMetadata.description
    };
}

const HomePage = async () => {
    const { success, blogs }: { success: boolean; blogs: GetBlogsProps[] } =
        await blogService.findAll();

    return (
        <>
            <main className="max-w-7xl w-full min-h-screen mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-2 pt-3 h-full hidden xl:block">
                        <SideLeftHome />
                    </div>
                    <div className="xl:col-span-7 lg:col-span-8 col-span-full pt-3">
                        {blogs && blogs.length > 0 ? (
                            <>
                                {blogs.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <CardBlog blog={item} />
                                        </Fragment>
                                    );
                                })}
                            </>
                        ) : (
                            <SkeletonCardBlog count={3} />
                        )}
                    </div>
                    <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3 h-full">
                        <SideRightHome />
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;
