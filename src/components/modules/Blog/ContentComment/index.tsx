import { Fragment, useEffect, useRef, useState } from "react";

import { Editor, EditorState } from "draft-js";

import CardComment from "@/components/common/CardComment";
import Link from "next/link";
import Image from "next/image";
import AvatarRank from "@/components/common/AvatarRank";

const ContentComment = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const editor = useRef<Editor | null>(null);
    const focusEditor = () => {
        if (editor.current) {
            editor.current.focus();
        }
    }

    console.log(editorState)

    return (
        <div className="md:px-5 px-3 py-5 -ml-1 bg-white mt-5 md:rounded-md shadow-sm">
            <div className="flex mb-5">
                <AvatarRank rank={1}>
                    <Link href={`/`}>
                        <Image
                            width={60}
                            height={60}
                            alt="ảnh người dùng"
                            src={
                                "/static/images/default/avatar_user_sm.jpg"
                            }
                            className="md:w-12 md:h-12 w-11 h-11 block object-cover rounded-full flex-shrink-0"
                        />
                    </Link>
                </AvatarRank>
                <div className="w-full flex-1 ml-2">
                    <div className="border rounded-md py-3 px-3 mb-2 bg-gray-100" onClick={focusEditor}>
                        <Editor
                            ref={editor}
                            editorState={editorState}
                            // placeholder="Viết bình luận..."
                            onChange={(editorState) => setEditorState(editorState)}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <input className="w-1/2 border px-3 py-2 rounded-md outline-none"/>
                        <input className="w-1/2 border px-3 py-2 rounded-md outline-none"/>
                        <button className="border text-white bg-indigo-600 rounded-md ml-auto py-1 px-3 min-w-[80px]">Gửi</button>
                    </div>
                </div>
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                return (
                    <Fragment key={item}>
                        <CardComment />
                    </Fragment>
                );
            })}

        </div>
    );
};

export default ContentComment;