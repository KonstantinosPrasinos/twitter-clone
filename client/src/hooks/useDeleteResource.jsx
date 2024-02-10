import { useCallback } from 'react';

const useDeleteResource = () => {
    const deleteResource = useCallback(async (resourceType, resourceId) => {
        try {
            const response = await fetch(`/api/${resourceType}/${resourceId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            return response;
        } catch (error) {
            console.error('Error deleting resource:', error);
            throw error;
        }
    }, []);

    return deleteResource;
};

export default useDeleteResource;