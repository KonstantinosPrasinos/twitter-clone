const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserProfile = async (req, res) => {
    const {user_id} = req.params;
    if (!user_id) return res.status(400).json({success: false, message: "User id required."})

    const formatPosts = (posts, isRepost = false) => {
        const formattedPosts = [];

        if (isRepost) {
            posts.forEach(repost => {
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

                formattedPosts.push(repostInfo)
            });
        } else {
            // Original posts
            posts.forEach(post => {
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
                        content: reply.content,
                        created_at: reply.created_at,
                    })),
                    isRepost: false,
                };

                formattedPosts.push(postInfo);
            })
        }

        return formattedPosts;
    }

    try {
        const originalPosts = await prisma.posts.findMany({
            where: {
                user_id: parseInt(user_id)
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
                        content: true,
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

        const repostedPosts = await prisma.reposts.findMany({
            where: {
                user_id: parseInt(user_id),
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                users: {
                    select: {
                        username: true
                    }
                },
                posts: {
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
                                content: true,
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
                    }
                }
            }
        });
        const likedPosts = await prisma.likes.findMany({
            where: {
                user_id: parseInt(user_id)
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                posts: {
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
                                content: true,
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
                    }
                }
            }
        });

        // Get the user
        const user = await prisma.users.findUnique({
            where: {
                user_id: parseInt(user_id)
            },
            select: {
                created_at: true,
                followers_followers_follower_user_idTousers: true,
                followers_followers_following_user_idTousers: true
            }
        })

        const isCurrentUserFollowing = user.followers_followers_follower_user_idTousers.some(
            follower => follower.follower_user_id === user_id
        );

        // Get the following and followers for the user
        const followingIdArray = user.followers_followers_following_user_idTousers.map(followingUser => followingUser.following_user_id);
        const followerIdArray = user.followers_followers_follower_user_idTousers.map(followerUser => followerUser.following_user_id);

        const followers = await prisma.users.findMany({
            where: {
                user_id: {
                    in: followerIdArray
                }
            },
            select: {
                username: true,
                user_id: true
            }
        });

        const following = await prisma.users.findMany({
            where: {
                user_id: {
                    in: followingIdArray
                }
            },
            select: {
                username: true,
                user_id: true
            }
        });

        // Format the posts and liked posts
        const formattedPosts = [...formatPosts(originalPosts), ...formatPosts(repostedPosts, true)];
        formattedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const formattedLikedPosts = [...formatPosts(likedPosts.map(post => post.posts))]
        formattedLikedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        res.status(200).json({user, posts: formattedPosts, likedPosts: formattedLikedPosts, followers, following, isCurrentUserFollowing})
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, message: 'Internal server error 1' });
    }
}


const followUser = async (req,res) => {
    //follower -> logged in user
    //following -> user that the logged in user wants to follow
    const {follower_user_id, following_username } = req.body;
    try {
        if (!follower_user_id || !following_username ) {
          return res.status(400).json({ success: false, message: "Follower userIDs and following username required." });
        }
        
        //check if the follower_user_id exists in the users table
        const followerExists = await prisma.users.findUnique({
            where: { user_id: follower_user_id },
        });
    
        if (!followerExists) {
            return res.status(404).json({ success: false, message: "Follower user not found." });
        }
    
        //check if the following user with the provided username exists
        const followingUser = await prisma.users.findUnique({
            where: { username: following_username },
        });
    
        if (!followingUser) {
            return res.status(404).json({ success: false, message: "Following user not found." });
        }       

        //check if the follow relationship already exists
        const existingFollow = await prisma.followers.findFirst({
          where: {
            follower_user_id,
            following_user_id: followingUser.user_id,
          },
        });
    
        if (existingFollow) {
          return res.status(400).json({ success: false, message: "User is already following the specified user." });
        }
    
        //create the follow relationship
        const newFollow = await prisma.followers.create({
          data: {
            follower_user_id,
            following_user_id: followingUser.user_id,
          },
        });
    
        res.status(201).json({ success: true, message: "User is now following the specified user.", follow: newFollow });
    } catch (error) {
        console.error("Error following user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }


}

const unfollowUser = async (req, res) => {
    //follower -> logged in user
    //following -> user that the logged-in user wants to unfollow
    const { follower_user_id, following_username } = req.body;
  
    try {
        if (!follower_user_id || !following_username) {
            return res.status(400).json({ success: false, message: "Follower and following userIDs required." });
        }
    
        //check if the follower_user_id and following_user_id exist in the users table
        const followerExists = await prisma.users.findUnique({
            where: { user_id: follower_user_id },
        });
    
        if (!followerExists) {
            return res.status(404).json({ success: false, message: "Follower or following user not found." });
        }
      
        //check if the following user with the provided username exists
        const followingUser = await prisma.users.findUnique({
            where: { username: following_username },
        });
    
        if (!followingUser) {
            return res.status(404).json({ success: false, message: "Following user not found." });
        }     

        //check if the follow relationship exists
        const existingFollow = await prisma.followers.findFirst({
            where: {
                follower_user_id,
                following_user_id: followingUser.user_id,
            },
        });
  
        if (!existingFollow) {
            return res.status(400).json({ success: false, message: "User is not following the specified user." });
        }
      

        //deelete the follow relationship
        await prisma.followers.delete({
            where: {
                follower_user_id :existingFollow.follower_user_id,
                following_user_id : existingFollow.following_user_id,
                follower_id: existingFollow.follower_id
            },
        });
  
      res.status(200).json({ success: true, message: "User is no longer following the specified user." });
    } catch (error) {
        console.error("Error unfollowing user:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
};



module.exports = {getUserProfile, followUser, unfollowUser};
