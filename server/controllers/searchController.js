const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const searchController = async (req,res) => {
    const {searchQuery} = req.body;
    if (searchQuery)
    {
        try{
            const userResults = await prisma.users.findMany({
                where: {
                  OR: [
                    { username: { contains: searchQuery } },
                    { email: { contains: searchQuery} },
                  ],
                },
            });
            res.json({
                users:userResults
            });
        }
        catch(error)
        {
            console.error('Error during search:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }
    else 
    {
        res.status(400).json({ error: 'Search query is missing!' });
    }
}
module.exports = searchController;