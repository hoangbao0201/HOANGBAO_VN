import { Fragment } from "react";
import { Metadata } from "next";

import siteMetadata from "@/lib/siteMetadata";
import CardTag from "@/components/modules/Tag/CardTag";
import tagService, { GetTagsProps } from "@/lib/services/tag.service";

type Props = {
    params: { slugUser: string }
}

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Danh sách chủ đề | " + siteMetadata.title,
        description: "Đây là nơi tập trung các thẻ đa dạng liên quan đến nhiều lĩnh vực, giúp bạn dễ dàng khám phá và tiếp cận thông tin một cách hiệu quả."
    };
}

const TagsPage = async ({ params } : Props) => {

    const { success, tags } : { success: boolean, tags: GetTagsProps[] } = await tagService.findAll();

    return (
        <div className="max-w-7xl w-full min-h-screen mx-auto mb-4">
            <div className="px-3 my-3">
                <div className="-mx-3">

                    <div className="px-3 mb-3">
                        <h1 className="font-extrabold text-2xl">Các chủ đề</h1>
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 px-1">
                        {
                            tags && tags.map((tag) => {
                                return (
                                    <Fragment key={tag.tagId}>
                                        <CardTag tag={tag}/>
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TagsPage;