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
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    else {
        console.error('Post Content is Empty!');
        res.status(400).json({ error: 'Post Content is Empty!' });
    }

}

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
    
    
        //create a new like entry
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
  

module.exports = {createPost,likePost,unlikePost};