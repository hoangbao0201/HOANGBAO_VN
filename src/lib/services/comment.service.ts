import { API_BASE_URL } from "../constants";

export interface GetCommentsProps {
    blogId: number,
    commentId: number,
    commentText: string,
    createdAt: Date,
    updatedAt: Date,
    sender: {
        userId: number,
        name: string,
        username: string,
        rank: number,
        role: {
            roleId: number,
            roleName: "user" | "admin"
        },
        avatarUrl: string | null
    },
    _count: {
        replyComments: number
    }
}

export interface GetReplyCommentsProps extends GetCommentsProps {
    receiver: {
        userId: number,
        name: string,
        username: string
    }
}

class CommentService {

    async getComments({query, cache, next}: { query?: string, cache?: RequestCache, next?: NextFetchRequestConfig }): Promise<any> {
        try {
            const commentsRes = await fetch(
                `${API_BASE_URL}/api/comments${query || ""}`,
                {
                    method: "GET",
                    cache: cache || "default",
                    next: next
                }
            );
            const comments = await commentsRes.json();
            return comments;
        } catch (error) {
            return {
                success: false,
                message: "error comments successful",
                error: error,
            };
        }
    }

    async getReplyComments({query, cache, next}: { query?: string, cache?: RequestCache, next?: NextFetchRequestConfig }): Promise<any> {
        try {
            const commentsRes = await fetch(
                `${API_BASE_URL}/api/comments/reply${query || ""}`,
                {
                    method: "GET",
                    cache: cache || "default",
                    next: next
                }
            );
            const comments = await commentsRes.json();
            return comments;
        } catch (error) {
            return {
                success: false,
                message: "error comments successful",
                error: error,
            };
        }
    }

}

const commentService = new CommentService();

export default commentService;
