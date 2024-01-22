import React from 'react';
import {useParams} from "react-router-dom";

const UserProfile = () => {
    const params = useParams()
    return (
        <div>
            Hello {params?.username}
        </div>
    );
};

export default UserProfile;