"use client";

import { Fragment, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

import "draft-js/dist/Draft.css";
import { useSession } from "next-auth/react";
import { Editor, EditorState, convertToRaw } from "draft-js";

import AvatarRank from "@/components/common/AvatarRank";
import CardComment from "@/components/common/CardComment";
import commentService from "@/lib/services/comment.service";
import { GetBlogDetailProps } from "@/lib/services/blog.service";
import { RootStateCommentsBlogDetail } from "@/redux/commentsBlogDetail";

interface ContentCommentProps {
    blog: GetBlogDetailProps;
}
const ContentComment = ({ blog }: ContentCommentProps) => {
    const { data: session, status } = useSession();
    const { commentsBlogDetail, isLoadingBlogDetail } = useSelector(
        (state: RootStateCommentsBlogDetail) => state.commentsBlogDetail
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const editor = useRef<Editor | null>(null);
    const focusEditor = () => {
        if (editor.current) {
            editor.current.focus();
        }
    };

    const handleSendComment = async () => {
        if (!session || status !== "authenticated") {
            return;
        }
        // const text = convertToRaw(editorState.getCurrentContent());
        // console.log("req ", text);
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

            console.log(commentRes);
        } catch (error) {}
    };

    // console.log({ commentsBlogDetail, isLoadingBlogDetail })

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
                        className="border rounded-md py-3 px-3 mb-2 bg-gray-100"
                        onClick={focusEditor}
                    >
                        <Editor
                            ref={editor}
                            editorState={editorState}
                            placeholder="Viết bình luận..."
                            onChange={(editorState) =>
                                setEditorState(editorState)
                            }
                        />
                        {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
                        {/* <div
                            dangerouslySetInnerHTML={{
                                __html: draftToHtml(
                                    convertToRaw(
                                        editorState.getCurrentContent()
                                    )
                                ),
                            }}
                        ></div> */}
                    </div>
                    <div className="flex space-x-2">
                        <input className="w-full border px-3 py-2 rounded-md outline-none" disabled={true} value={session?.user.name || ""}/>
                        <button
                            onClick={handleSendComment}
                            className="border text-white bg-indigo-600 rounded-md ml-auto py-1 px-3 min-w-[80px]"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </div>

            {commentsBlogDetail &&
                commentsBlogDetail.map((comment, index) => {
                    return (
                        <Fragment key={comment?.commentId || index}>
                            <CardComment comment={comment} />
                        </Fragment>
                    );
                })}
        </div>
    );
};

export default ContentComment;
