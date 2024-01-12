const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createFeed = async (req, res) => {
  const userID = req.body.userID;
  try {
    const followers = await prisma.followers.findMany({
      where: {
        following_user_id: userID,
      },
    });

    const followerUserIds = followers.map(follower => follower.follower_user_id);

    try {
      // Fetch posts from followers
      const feedPosts = await prisma.posts.findMany({
        where: {
          user_id: {
            in: followerUserIds,
          },
        },
        orderBy: {
          created_at: 'desc',
        },
        include: {
          users: true,
          likes: {
            select: {
              user_id: true,
              users: {
                select: {
                  username: true,
                },
              },
            },
          },
          replies: {
            select: {
              user_id: true,
              users: {
                select: {
                  username: true,
                },
              },
              created_at: true,
            },
          },
          reposts: {
            select: {
              repost_id: true,
              user_id: true,
              post_id: true,
              created_at: true,
              users: {
                select: {
                  username: true,
                },
              },
              posts: {
                select: {
                  user_id: true,
                  users: {
                    select: {
                      username: true,
                    },
                  },
                  content: true,
                  created_at: true,
                },
              },
            },
          },
        },
      });

      const formattedFeed = [];

      feedPosts.forEach(post => {
        // Original posts
        const postInfo = {
          post_id: post.post_id,
          user_id: post.user_id,
          username: post.users.username,
          content: post.content,
          created_at: post.created_at,
          likes: post.likes.map(like => ({
            user_id: like.user_id,
            username: like.users.username,
          })),
          replies: post.replies.map(reply => ({
            user_id: reply.user_id,
            username: reply.users.username,
            created_at: reply.created_at,
          })),
          isRepost: false,
        };

        // Reposts
        post.reposts.forEach(repost => {
          const repostInfo = {
            repost_id: repost.repost_id,
            reposted_user_id: repost.user_id,
            reposted_username: repost.users.username,
            post_id: repost.post_id,
            original_user_id: repost.posts.user_id,
            original_username: repost.posts.users.username,
            content: repost.posts.content,
            created_at: repost.created_at,
            isRepost: true,
          };

          formattedFeed.push(repostInfo);
        });

        formattedFeed.push(postInfo);
      });

      // Sort the combined list by created_at
      formattedFeed.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      res.status(201).json({ success: true, message: 'Followers posts', posts: formattedFeed });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = createFeed;
