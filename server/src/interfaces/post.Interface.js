export class Iposts {
    async getRandomPosts(limit, orderBy, page, category) {
        throw new Error('Method getRandomPosts is not overwritten.');
    }

    async getPosts(userId, limit, orderBy, page, category) {
        throw new Error('Method getPosts is not overwritten.');
    }

    async getPost(postId, userId) {
        throw new Error('Method getPost is not overwritten.');
    }

    async createPost(postId, ownerId, title, content, category, image) {
        throw new Error('Method addPost is not overwritten');
    }

    async deletePost(postId) {
        throw new Error('Method deletePost is not overwritten.');
    }

    async updatePostViews(postId, userIdentifier) {
        throw new Error('Method updatePostViews is not overwritten.');
    }

    async updatePostDetails(postId, title, content, category, updatedAt) {
        throw new Error('Method updatePostDetails is not overwritten.');
    }

    async updatePostImage(postId, image, updatedAt) {
        throw new Error('Method updatePostImage is not overwritten.');
    }

    async togglePostVisibility(postId, visibility) {
        throw new Error('Method togglePostVisibility is not overwritten.');
    }

    async toggleSavePost(postId, userId) {
        throw new Error('Method toggleSavePost is not overwritten.');
    }

    async getSavedPosts(userId, orderBy) {
        throw new Error('Method getSavedPosts is not overwritten.');
    }
}