"use client"

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ListImageEditBlog from "./ListImageBlog";
import EditBlogConfirm from "./EditBlogConfirm";
import { useDebounce } from "@/hook/useDebounce";
import EditorMarkdown from "@/components/common/EditorMarkdown";
import { setIsSaveBlogEditRDHandle, setBlogEditRDHandle } from "@/redux/blogEditSlide";
import blogService, { GetBlogEditProps } from "@/lib/services/blog.service";


interface FormEditBlogProps {
    blog: GetBlogEditProps
}
const FormEditBlog = ({ blog } : FormEditBlogProps) => {

    const dispatch = useDispatch();
    const { blogEdit, isSave } = useSelector((state: any) => state.blogEdit);

    const contentBlogEditDebounce = useDebounce(JSON.stringify(blogEdit), 3000);

    // SESSION
    const { data: session, status } = useSession();

    // Onchange Data Blog
    const eventOnchangeDataBlog = (data: { [key: string]: any }) => {
        dispatch(setIsSaveBlogEditRDHandle(false));     
        dispatch(setBlogEditRDHandle({
            ...blogEdit,
            ...data
        }));
    };

    // Handle Save Blog
    const handleSaveEditBlog = async () => {
        if(!session || status !== "authenticated") {
            return;
        }
        try {
            const saveEditBlogRes = await blogService.updateBlog({
                data: blogEdit,
                token: session?.backendTokens.accessToken
            });

            if(saveEditBlogRes && saveEditBlogRes.success) {
                dispatch(setIsSaveBlogEditRDHandle(true));
            }
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        if(isSave) {
            dispatch(setBlogEditRDHandle(blog));
            console.log("load lần đầu")
        }
        else {
            handleSaveEditBlog()
            console.log("lưu bài viết")
        }
    }, [contentBlogEditDebounce]);

    return (
        <main className="">
            <div
                className="py-5 px-4 bg-white"
            >
                <div className="flex">
                    <input
                        name="title"
                        value={blogEdit?.title || ''}
                        onChange={(e) => eventOnchangeDataBlog({ [e.target.name]: e.target.value })}
                        placeholder="Tiêu đề bài viết"
                        className="border-b outline-none mb-4 pb-2 font-semibold text-xl w-full"
                    />
                    <EditBlogConfirm />
                </div>

                <ListImageEditBlog />

                {!isSave && "Loading"}
                
                <div>
                    {session ? (
                        <EditorMarkdown
                            lastEdited={blogEdit?.updatedAt}
                            content={blogEdit?.content}
                            onchangeContent={eventOnchangeDataBlog}
                        />
                    ) : (
                        <div className="w-full min-h-screen border-none"></div>
                    )}
                </div>
            </div>

        </main>
    );
};

export default FormEditBlog;
