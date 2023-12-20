"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import "draft-js/dist/Draft.css";
import { useSession } from "next-auth/react";

import { Editor, EditorState, convertToRaw } from "draft-js";

import AvatarRank from "@/components/common/AvatarRank";
import CardComment from "@/components/common/CardComment";
import commentService from "@/lib/services/comment.service";
import { GetBlogDetailProps } from "@/lib/services/blog.service";
import { RootStateCommentsBlogDetail, addCommentsBlogDetailRDHandle } from "@/redux/commentsBlogDetail";


const EditorComment = dynamic(() => import("@/components/common/EditorComment"), {
    ssr: false
});

interface ContentCommentProps {
    blog: GetBlogDetailProps;
}
const ContentComment = ({ blog }: ContentCommentProps) => {
    const { slugBlog } = useParams<{ slugBlog: string }>()

    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const [isLoadingSendComment, setIsLoadingSendComment] = useState(false);
    const [isFormSendComment, setIsFormSendComment] = useState(false);
    const { commentsBlogDetail, isLoadingBlogDetail } = useSelector(
        (state: RootStateCommentsBlogDetail) => state.commentsBlogDetail
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const editor = useRef<Editor | null>(null);

    const handleSendComment = async () => {
        if (!session || status !== "authenticated") {
            return;
        }
        setIsLoadingSendComment(true);

        try {
            const commentRes = await commentService.addComment({
                data: {
                    blogId: blog.blogId,
                    commentText: JSON.stringify(
                        convertToRaw(editorState.getCurrentContent())
                    ) as string,
                },
                token: session.backendTokens.accessToken
            });

            if(commentRes.success) {
                dispatch(addCommentsBlogDetailRDHandle([{
                    ...commentRes.comment,
                    sender: {
                        userId: session.user.userId,
                        name: session.user.name,
                        username: session.user.username,
                        rank: session.user.rank,
                        role: {
                            roleId: session.user.role.roleId,
                            roleName: session.user.role.roleName
                        },
                        avatarUrl: session.user.avatarUrl
                    },
                    _count: {
                        replyComments: 0
                    }
                }]))
            }
            setEditorState(EditorState.createEmpty());
            setIsLoadingSendComment(false);
            editor.current?.focus()
        } catch (error) {
            setEditorState(EditorState.createEmpty());
            setIsLoadingSendComment(false);
        }
    };

    return (
        <div className="md:px-5 px-3 py-5 bg-white mt-5 md:rounded-md shadow-sm">
            <h5 className="text-lg font-semibold mb-4">Bình luận bài viết</h5>

            <div className="flex mb-5">
                <AvatarRank rank={1}>
                    <Link href={`/`}>
                        <Image
                            width={60}
                            height={60}
                            alt="ảnh người dùng"
                            src={"/static/images/default/avatar_user_sm.jpg"}
                            className="md:w-11 md:h-11 w-10 h-10 block object-cover rounded-full flex-shrink-0"
                        />
                    </Link>
                </AvatarRank>
                <div className="w-full flex-1 ml-2">
                    <div
                        className="border rounded-md py-3 px-3 mb-2 bg-gray-100 min-h-[50px] transition-all"
                        // onClick={focusEditor}
                        onClick={() => setIsFormSendComment(true)}
                    >
                        {
                            isFormSendComment ? (
                                <EditorComment
                                    editor={editor}
                                    placeholder="Viết bình luận..."
                                    editorState={editorState}
                                    setEditorState={setEditorState}
                                />
                            ) : (
                                <span className="text-gray-500">
                                    Viết bình luận...
                                </span>
                            )
                        }
                    </div>
                    <div className="flex space-x-2">
                        <input className="w-full border px-3 py-2 text-gray-500 rounded-md outline-none" disabled={true} value={session?.user.name || " "}/>
                        <button
                            onClick={handleSendComment}
                            className="border text-white bg-indigo-600 rounded-md ml-auto py-1 px-3 min-w-[80px]"
                        >
                            Gửi
                            {isLoadingSendComment && (<span style={{ borderTop: "2px solid white" }} className="w-3 h-3 ml-2 loading-button"></span>)}
                        </button>
                    </div>
                </div>
            </div>

            {commentsBlogDetail && commentsBlogDetail.length > 0 &&
                commentsBlogDetail.map((comment, index) => {
                    return (
                        <Fragment key={comment.commentId || index}>
                            <CardComment comment={comment} />
                        </Fragment>
                    );
                })}
        </div>
    );
};

export default ContentComment;
