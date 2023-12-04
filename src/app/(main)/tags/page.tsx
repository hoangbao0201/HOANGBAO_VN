import { Fragment } from "react";
import { GetStaticProps } from "next";

import { REVALIDATE_TIME } from "@/lib/constants";
import tagService, { GetTagsProps } from "@/lib/services/tag.service";
import CardTag from "@/components/modules/Tag/CardTag";

type Props = {
    params: { slugUser: string }
}

const TagsPage = async ({ params } : Props) => {

    const { success, tags } : { success: boolean, tags: GetTagsProps[] } = await tagService.findAll();

    return (
        <div className="max-w-7xl w-full min-h-screen mx-auto mb-4">
            <div className="px-3 my-3">
                <div className="-mx-3">
                    <div className="px-3 mb-3">
                        <h1 className="font-extrabold text-2xl">Tags</h1>
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