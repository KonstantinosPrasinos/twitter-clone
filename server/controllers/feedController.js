const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createFeed = async (req,res) => {
    const userID = req.body.userID;
    try {
        const followers = await prisma.followers.findMany({
            where: {
                following_user_id: userID,
            },
        });
        
        const followerUserIds = followers.map(follower => follower.follower_user_id);
        try{
            const posts = await prisma.posts.findMany({
                where: {
                    user_id: {
                    in: followerUserIds,
                    },
                },
                orderBy: {
                    created_at: 'desc',
                }

            });
            
            /*
            posts.forEach(post => {
                console.log(`Post ID: ${post.post_id}, User ID: ${post.user_id}, Content: ${post.content}, Created At: ${post.created_at}`);
            });
            */
            res.status(201).json({ success: true, message: 'Followers posts', posts });

        }
        catch(error){
            console.error('Error fetching posts:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }

    }
    catch(error){
        console.error('Error fetching followers:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
    finally {
        await prisma.$disconnect();
    }
}

module.exports = createFeed;