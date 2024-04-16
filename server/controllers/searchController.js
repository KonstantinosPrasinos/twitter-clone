
const searchController = async (prisma,req,res) => {
    const {searchQuery} = req.query;
    if (searchQuery)
    {
        try{
            const userResults = await prisma.users.findMany({
                where: {
                  OR: [
                    { username: { contains: searchQuery, mode: 'insensitive' } }
                  ],
                },
            });
            
            const postResults = await prisma.posts.findMany({
                where: {
                    OR: [
                      { content: { contains: searchQuery, mode: 'insensitive' } },
                      {
                        users: {
                            username: { contains: searchQuery, mode: 'insensitive' },
                        },
                      },
                    ],
                  },
                  include: {
                    users: true, 
                  },
            });
            res.json({
                users:userResults,
                posts:postResults
            });
        }
        catch(error)
        {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }
    else 
    {
        res.status(400).json({ error: 'Search query is missing!' });
    }
}
module.exports = searchController;