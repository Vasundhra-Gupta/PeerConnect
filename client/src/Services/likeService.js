class LikeService {
    async togglePostLike(postId, likedStatus) {
        try {
            const res = await fetch(
                `/api/v1/likes/toggle-post-like/${postId}?likedStatus=${likedStatus}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                }
            );

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(`error in togglePostLike service: ${err.message}`);
            throw err;
        }
    }

    async toggleCommentLike(commentId, likedStatus) {
        try {
            const res = await fetch(
                `/api/v1/likes/toggle-comment-like/${commentId}?likedStatus=${likedStatus}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                }
            );

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(`error in toggleCommentLike service: ${err.message}`);
            throw err;
        }
    }

    async getLikedPosts(signal, limit = 10, page = 1, orderBy = 'desc') {
        try {
            const res = await fetch(
                `/api/v1/likes?limit=${limit}&page=${page}&orderBy=${orderBy}`,
                {
                    method: 'GET',
                    signal,
                    credentials: 'include',
                }
            );

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('get liked posts request aborted.');
            } else {
                console.error(`error in getLikedPosts service: ${err.message}`);
                throw err;
            }
        }
    }
}

export const likeService = new LikeService();
