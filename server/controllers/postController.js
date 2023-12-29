const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPost = async (req,res) => {
    const {userId,postContent} = req.body;
    if (!postContent)
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

module.exports = createPost;