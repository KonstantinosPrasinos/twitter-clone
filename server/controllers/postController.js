const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const createPost = async (req,res) => {
    const {userId,postContent} = req.body;

    if (postContent)
    {
        try{
            const newPost = await prisma.posts.create({
                data: {
                  user_id: userId,
                  content: postContent,
                },
            });
            res.status(201).json(newPost);
        }
        catch (error)
        {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    else {
        res.status(400).json({ error: 'Post Content is Empty!' });
    }

}
const deletePost = async (req,res) => {
    try
    {
        const postId = parseInt(req.params.postId);
        if (!postId || isNaN(postId)) {
            return res.status(400).json({ message: 'Invalid postId.' });
        }
        const authUserId = parseInt(req.user.userId);
        const existingPost = await prisma.posts.findUnique({
            where: { post_id: postId },
            select: {
                user_id: true
            },
        });
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        // Check if the owner of the post that will be deleted is the authenticated user
        if (existingPost.user_id !== authUserId) {
            return res.status(403).json({ message: 'You are not authorized to delete this post.' });
        }
        await prisma.posts.delete({
            where: { post_id: postId }
        });
        res.status(204).send();
    }
    catch (error) 
    {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const likePost = async (req, res) => {
    const { user_id, post_id } = req.body;
  
    try {
        if (!user_id || !post_id) {
            return res.status(400).json({ success: false, message: "User ID and Post ID are required." });
        }
    
        //check if the user and post exist
        const userExists = await prisma.users.findUnique({
            where: { user_id: user_id },
        });
    
        const postExists = await prisma.posts.findUnique({
            where: { post_id: post_id },
        });
    
        if (!userExists || !postExists) {
            return res.status(404).json({ success: false, message: "User or post not found." });
        }
    
        //check if the user has already liked the post
        const existingLike = await prisma.likes.findFirst({
            where: {
            user_id: user_id,
            post_id: post_id,
            },
        });
    
        if (existingLike) {
            return res.status(400).json({ success: false, message: "User has already liked the post." });
        }
    
        //create a new like entry
        const newLike = await prisma.likes.create({
            data: {
            user_id: user_id,
            post_id: post_id,
            },
        });
    
        res.status(201).json({ success: true, message: "Post liked successfully.", like: newLike });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
            await prisma.$disconnect();
    }
};

  const unlikePost = async (req, res) => {
    const { user_id, post_id } = req.body;
  
    try {
        if (!user_id || !post_id) {
            return res.status(400).json({ success: false, message: "User ID and Post ID are required." });
        }
    
        //check if the user and post exist
        const userExists = await prisma.users.findUnique({
            where: { user_id: user_id },
        });
    
        const postExists = await prisma.posts.findUnique({
            where: { post_id: post_id },
        });
    
        if (!userExists || !postExists) {
            return res.status(404).json({ success: false, message: "User or post not found." });
        }
    
        //check if the user has already unliked the post
        const existingLike = await prisma.likes.findFirst({
            where: {
            user_id: user_id,
            post_id: post_id,
            },
        });
        
        if (!existingLike) {
            return res.status(400).json({ success: false, message: "User has already unliked the post." });
        }
    
    
        //delete existing like entry
        await prisma.likes.delete({
            where: {
            user_id: existingLike.user_id,
            post_id: existingLike.post_id,
            like_id: existingLike.like_id
            },
        });
    
        res.status(201).json({ success: true, message: "Post unliked successfully."});
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
};
  
const repostPost = async (req, res) => {
    const { user_id, post_id } = req.body;
    try{
        if (!user_id || !post_id) {
            return res.status(400).json({ success: false, message: "User ID and Post ID are required." });
        }
    
        //check if the user and post exist
        const userExists = await prisma.users.findUnique({
            where: { user_id: user_id },
        });
    
        const postExists = await prisma.posts.findUnique({
            where: { post_id: post_id },
        });
    
        if (!userExists || !postExists) {
            return res.status(404).json({ success: false, message: "User or post not found." });
        }
    
        //check if the user has already reposted the post
        const existingRepost = await prisma.reposts.findFirst({
            where: {
            user_id: user_id,
            post_id: post_id,
            },
        });
    
        if (existingRepost) {
            return res.status(400).json({ success: false, message: "User has already reposted the post." });
        }
    
        //create a new repost entry
        const newRepost = await prisma.reposts.create({
            data: {
            user_id: user_id,
            post_id: post_id,
            },
        });

        res.status(201).json({ success: true, message: "Post reposted successfully.", repost: newRepost });

    } catch (error) {
        console.error("Error reposting post:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
            await prisma.$disconnect();
    }
};

const unrepostPost = async (req, res) => {
    const { user_id, post_id } = req.body;
  
    try {
        if (!user_id || !post_id) {
            return res.status(400).json({ success: false, message: "User ID and Post ID are required." });
        }
    
        //check if the user and post exist
        const userExists = await prisma.users.findUnique({
            where: { user_id: user_id },
        });
    
        const postExists = await prisma.posts.findUnique({
            where: { post_id: post_id },
        });
    
        if (!userExists || !postExists) {
            return res.status(404).json({ success: false, message: "User or post not found." });
        }
    
        //check if the user has already unreposted the post
        const existingRepost = await prisma.reposts.findFirst({
            where: {
            user_id: user_id,
            post_id: post_id,
            },
        });
        
        if (!existingRepost) {
            return res.status(400).json({ success: false, message: "User has already unreposted the post." });
        }
    
    
        //delete existing repost entry
        await prisma.reposts.delete({
            where: {
            user_id: existingRepost.user_id,
            post_id: existingRepost.post_id,
            repost_id: existingRepost.repost_id
            },
        });
    
        res.status(201).json({ success: true, message: "Post unreposted successfully."});
    } catch (error) {
        console.error("Error unreposting post:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
};

const replyPost = async (req, res) => {
    const { user_id, post_id, content } = req.body;
    try{
        if (!user_id || !post_id) {
            return res.status(400).json({ success: false, message: "User ID and Post ID are required." });
        }
    
        //check if the user and post exist
        const userExists = await prisma.users.findUnique({
            where: { user_id: user_id },
        });
    
        const postExists = await prisma.posts.findUnique({
            where: { post_id: post_id },
        });
    
        if (!userExists || !postExists) {
            return res.status(404).json({ success: false, message: "User or post not found." });
        }
    
        //create a reply entry
        const newReply = await prisma.replies.create({
            data: {
            user_id: user_id,
            post_id: post_id,
            content: content
            },
        });

        res.status(201).json({ success: true, message: "Reply to post created successfully.", reply: newReply });

    } catch (error) {
        console.error("Error replying post:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
            await prisma.$disconnect();
    }
};


const unreplyPost = async (req, res) => {
    const { user_id, reply_id } = req.body;
    try {
        // Check if all required fields are provided
        if (!user_id || !reply_id) {
            return res.status(400).json({ success: false, message: "User ID and reply ID are required." });
        }
    
        // Check if the user and reply exist
        const userExists = await prisma.users.findUnique({
            where: { user_id: user_id },
        });

        const replyExists = await prisma.replies.findUnique({
            where: { reply_id: reply_id },
        });
    
        if (!userExists || !replyExists) {
            return res.status(404).json({ success: false, message: "User or reply not found." });
        }
        // Delete the reply
        await prisma.replies.delete({
            where: { reply_id: reply_id },
        });

        res.status(201).json({ success: true, message: "Reply deleted successfully." });

    } catch (error) {
        console.error("Error deleting reply:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {createPost,likePost,unlikePost,repostPost,unrepostPost,replyPost,unreplyPost,deletePost};
