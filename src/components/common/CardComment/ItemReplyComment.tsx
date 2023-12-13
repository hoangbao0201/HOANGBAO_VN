"use client"

import Link from "next/link";
import Image from "next/image";

import AvatarRank from "../AvatarRank";
import clsx from "clsx";
import { GetReplyCommentsProps } from "@/lib/services/comment.service";

interface ItemCommentProps {
    comment: GetReplyCommentsProps
    childIndex?: number
    lastChild?: boolean
    isLineSide?: boolean
}

const ItemComment = ({ comment, childIndex, lastChild, isLineSide }: ItemCommentProps) => {
    return (
        <div className={clsx(
            "flex pb-2 relative",
            {
                "pl-12": childIndex == 1
            }
        )}>
            
            {
                isLineSide && !lastChild && (<div className="w-[2px] h-full absolute left-[22px] top-1 bottom-0 bg-gray-200"></div>)
            }
            {
                childIndex && (<div className="border-l-2 border-b-2 border-gray-200 w-6 h-4 absolute left-[22px] top-1 bottom-0 rounded-bl-lg"></div>)
            }

            <AvatarRank rank={1}>
                <Link href={`/`}>
                    <Image
                        width={60}
                        height={60}
                        alt={`Ảnh người dùng ${comment?.sender.name}`}
                        src={comment?.sender.avatarUrl || "/static/images/default/avatar_user_sm.jpg"}
                        className="md:w-10 md:h-10 w-9 h-9 block object-cover rounded-full flex-shrink-0"
                    />
                </Link>
            </AvatarRank>
            <div className="w-full flex-1 ml-2">
                <div
                    className="border rounded-md pt-2 pb-3 px-3 mb-1 bg-gray-100 min-h-[50px]"
                >
                    <div>
                        <Link href={`/user/${comment?.sender.username}`}>
                            <span className="font-semibold">
                                {comment?.sender.name}
                            </span>
                        </Link>
                    </div>
                    <div>
                        {/* Em rất thích nhưng dạng sách hiểu bản chất như này ạ. Em
                        cảm ơn anh nhiều. Hy vọng bên cạnh sách giúp học AI,
                        ML,... dùng những framework hay library đang hiện hành
                        rất nhiều, mong anh chia sẻ thêm những cuốn sách đi từ
                        bản chất như này lên ạ. */}
                        {comment?.commentText}
                    </div>
                </div>
                <div className="px-2 flex">
                    <span className="text-sm font-medium hover:underline cursor-pointer">
                        Phản hồi
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ItemComment;
