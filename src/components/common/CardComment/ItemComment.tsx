"use client"

import Link from "next/link";
import Image from "next/image";

import AvatarRank from "../AvatarRank";
import clsx from "clsx";
import { GetReplyCommentsProps } from "@/lib/services/comment.service";
import { CommentsBlogDetailProps } from "@/redux/commentsBlogDetail";
import draftToHtml from "draftjs-to-html";
import ButtonAction from "./ButtonAction";

interface ItemCommentProps {
    comment: CommentsBlogDetailProps
    isReply?: boolean
    childIndex?: number
    lastChild?: boolean
}

const ItemComment = ({ comment, isReply, childIndex, lastChild }: ItemCommentProps) => {
    return (
        <div className={clsx(
            "flex pb-2 relative item-comment",
            {
                "pl-12": childIndex == 1
            }
        )}>
            
            {
                isReply && !lastChild && (<div className="border-l-2 border-gray-200 h-full absolute left-[20px] top-1 bottom-0"></div>)
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
                    <div className="flex items-center justify-between">
                        <Link href={`/user/${comment?.sender.username}`}>
                            <span className="font-semibold">
                                {comment?.sender.name}
                            </span>
                        </Link>

                        <ButtonAction
                            senderId={comment.sender.userId}
                            commentId={comment.commentId}
                        />
                    </div>
                    <div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: draftToHtml(JSON.parse(comment?.commentText || ""))
                            }}
                        ></div>
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
