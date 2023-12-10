import { createSlice } from "@reduxjs/toolkit";
import { TagProps } from "@/lib/services/blog.service";


export interface EditBlogSlideProps {
    blogEdit: {
        blogId: number;
        slug: string;
        title: string;
        summary: string;
        content: string;
        thumbnailUrl: string;
        createdAt: Date;
        updatedAt: Date;
        blogTags: { tags: TagProps }[];
        blogImages: { blogImageId: number, urlImage: string }[]
    } | null,

    isSave: boolean
}
const initialState: EditBlogSlideProps = {
    blogEdit: null,
    isSave: true
};

export const counterSlice = createSlice({
    name: "blogEdit",
    initialState,
    reducers: {
        setblogEditRDHandle: (state, action) => {
            state.blogEdit = action.payload;
        },
        setIsSaveRDHandle: (state, action) => {
            state.isSave = action.payload;
        },
    },
});

export const { setblogEditRDHandle, setIsSaveRDHandle } =
    counterSlice.actions;

export default counterSlice.reducer;
