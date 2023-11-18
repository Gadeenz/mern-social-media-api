import { Post } from './schemas';

export class PostsService {
  async add(reqBody: any) {
    const addPost = new Post({
      ...reqBody,
    });
    addPost.save();
    return { success: true };
  }

  async getFeedPosts() {
    const posts: any = await Post.find().sort({ _id: -1 });
    return posts;
  }

  async getUserPosts(userId: any) {
    const post = await Post.find(userId);
    return post;
  }

  async likePost(id: any, userId: any) {
    const post: any = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    return updatedPost;
  }
}
