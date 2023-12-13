import { Fragment } from "react";

import ItemComment from "./ItemComment";
import EditorComment from "./EditorComment";
import commentService, {
    GetCommentsProps,
} from "@/lib/services/comment.service";
import IconArrowTurnUp from "@/components/modules/icons/IconArrowTurnUp";
import { useDispatch, useSelector } from "react-redux";
import {
    CommentsBlogDetailProps,
    RootStateCommentsBlogDetail,
    setReplyCommentsBlogDetailRDHandle,
} from "@/redux/commentsBlogDetail";
import ItemReplyComment from "./ItemReplyComment";

const replyComment = [1, 2, 3];

interface CardCommentProps {
    comment: CommentsBlogDetailProps;
}
const CardComment = ({ comment }: CardCommentProps) => {
    const dispatch = useDispatch();
    const { commentsBlogDetail, isLoadingBlogDetail } = useSelector(
        (state: RootStateCommentsBlogDetail) => state.commentsBlogDetail
    );

    const handleGetReplyComments = async () => {
        try {
            const replyCommentsRes = await commentService.getReplyComments({
                query: `?blogId=${comment?.blogId}&parentId=${comment?.commentId}`,
            });
            if (replyCommentsRes?.success) {
                dispatch(
                    setReplyCommentsBlogDetailRDHandle({
                        commentId: comment.commentId,
                        replyComments: replyCommentsRes?.comments,
                    })
                );
            }
        } catch (error) {}
    };


    return (
        <div className="mb-3">
            <ItemComment comment={comment} />

            <div className="">
                {comment?.replyComments &&
                    comment?.replyComments.map((replyComment, index) => {
                        return (
                            <Fragment key={replyComment.commentId}>
                                <ItemReplyComment
                                    childIndex={1}
                                    lastChild={
                                        comment?.replyComments.length ===
                                        index + 1
                                    }
                                    isLineSide={commentsBlogDetail.length > 0}
                                    comment={replyComment}
                                />
                            </Fragment>
                        );
                    })}
            </div>
            {/* <EditorComment /> */}

            {
                comment?.replyComments ? (
                    comment._count.replyComments > comment.replyComments.length && (
                        <div className="pl-12 text-sm relative">
                            <div className="border-l-2 border-b-2 border-gray-200 w-6 h-4 absolute left-[22px] bottom-0 rounded-bl-md -top-[6px]"></div>
                            <div
                                className="cursor-pointer flex items-center"
                                onClick={handleGetReplyComments}
                            >
                                <i className="rotate-90 mx-2">
                                    <IconArrowTurnUp size={17} />
                                </i>
                                Xem tất cả {comment?._count.replyComments} phản hồi
                            </div>
                        </div>
                    )
                ) : (
                    comment._count.replyComments > 0 && (
                        <div className="pl-12 text-sm relative">
                            <div className="border-l-2 border-b-2 border-gray-200 w-6 h-4 absolute left-[22px] bottom-0 rounded-bl-md -top-[6px]"></div>
                            <div
                                className="cursor-pointer flex items-center"
                                onClick={handleGetReplyComments}
                            >
                                <i className="rotate-90 mx-2">
                                    <IconArrowTurnUp size={17} />
                                </i>
                                Xem tất cả {comment?._count.replyComments} phản hồi
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
};

export default CardComment;
