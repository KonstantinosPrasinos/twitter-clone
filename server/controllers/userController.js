const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserProfile = async (req, res) => {
    const {user_id} = req.params;

    if (!user_id) return res.status(400).json({success: false, message: "Username required."})

    try {
        const userPosts = await prisma.posts.findMany({
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

        const followingIdArray = user.followers_followers_following_user_idTousers.map(followingUser => followingUser.follower_user_id)
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

        const formattedPosts = [];

        userPosts.forEach(post => {
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
                    content: reply.content,
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

                formattedPosts.push(repostInfo);
            });

            formattedPosts.push(postInfo);
        });

        const formattedLikedPosts = []

        likedPosts.forEach(like => {
            const post = like?.posts;
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
                    content: reply.content,
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

                formattedLikedPosts.push(repostInfo);
            });

            formattedLikedPosts.push(postInfo);
        })

        // Sort the combined list by created_at
        formattedLikedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        res.status(200).json({user, posts: formattedPosts, likedPosts: formattedLikedPosts, followers, following})
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, message: 'Internal server error 1' });
    }
}

module.exports = getUserProfile;