"use client";

import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import convertTime from "@/utils/convertTime";
import TextActionSave from "./Toolbar/TextActionSave";
import imageService from "@/lib/services/image.service";
import { useEffect } from "react";

interface EditorMarkdownProps {
    lastEdited: Date;
    content: string | undefined;
    onchangeContent: (data: { [key: string]: any }) => void;
}
const EditorMarkdown = ({
    lastEdited,
    content,
    onchangeContent,
}: EditorMarkdownProps) => {
    // SESSION
    const { data: session, status } = useSession();

    // Hanlde Upload Image Blog
    const handleUploadImageBlog = async (file: File) => {
        if (!session || status !== "authenticated") {
            {
                return;
            }
        }

        try {
            const formData = new FormData();
            formData.append("image", file);
            const imageUrl = await imageService.createImageBlog({
                dataImage: formData,
                token: session.backendTokens.accessToken,
            });

            if (imageUrl?.success) {
                return imageUrl.image.url;
            }
        } catch (error) {}
    };

    const editorConfig = {
        onImageUpload: handleUploadImageBlog,
        renderHTML: (text: string) => (
          <ReactMarkdown className="prose">{text}</ReactMarkdown>
        ),
    };

    // Use TextActionSave with the provided configuration
    Editor.use(TextActionSave, {
        start: `Lần sửa cuối ${convertTime(lastEdited)}`,
    });

    useEffect(() => {
        // Editor.use(TextActionSave, textActionConfig);
        Editor.use(TextActionSave, {
            start: `Lần sửa cuối ${convertTime(lastEdited)}`,
        });
    }, [lastEdited])

    return (
        <div>
            <Editor
                value={content || ""}
                className="w-full min-h-screen border-none"
                onChange={({ text, html }) =>
                    onchangeContent({ content: text })
                }
                {...editorConfig}
            />
        </div>
    );
};

export default EditorMarkdown;
