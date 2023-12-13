import { createSlice } from "@reduxjs/toolkit";
import { GetCommentsProps, GetReplyCommentsProps } from "@/lib/services/comment.service";

export type RootStateCommentsBlogDetail = {
    commentsBlogDetail: CommentsBlogDetailSlideProps;
};
export interface CommentsBlogDetailProps extends GetCommentsProps { replyComments: GetReplyCommentsProps[] };

export interface CommentsBlogDetailSlideProps {
    commentsBlogDetail: CommentsBlogDetailProps[]
    isLoadingBlogDetail: boolean
}
const initialState: CommentsBlogDetailSlideProps = {
    commentsBlogDetail: [],
    isLoadingBlogDetail: true
};
export const counterSlice = createSlice({
    name: "commentsBlogDetail",
    initialState,
    reducers: {
        setCommentsBlogDetailRDHandle: (state, action) => {
            state.commentsBlogDetail = action.payload;
        },
        setReplyCommentsBlogDetailRDHandle: (state, action) => {

            const foundIndex = state.commentsBlogDetail.findIndex(comment => comment.commentId === action.payload.commentId);

            if (foundIndex !== -1) {
                const foundComment = state.commentsBlogDetail[foundIndex];
                
                if (foundComment) {
                    foundComment.replyComments = foundComment?.replyComments || [];
                    foundComment.replyComments.push(...action.payload.replyComments);
                }
            }
        },
        setIsLoadingCommentsBlogDetailRDHandle: (state, action) => {
            state.isLoadingBlogDetail = action.payload;
        },
    },
});

export const { setCommentsBlogDetailRDHandle, setReplyCommentsBlogDetailRDHandle, setIsLoadingCommentsBlogDetailRDHandle } =
    counterSlice.actions;

export default counterSlice.reducer;