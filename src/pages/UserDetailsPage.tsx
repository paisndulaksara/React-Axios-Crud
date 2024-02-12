// src/pages/UserDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../api/users';

const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        console.error('User ID is undefined');
        return;
      }
      try {
        const userData = await getUserDetails(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        {user ? (
          <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
            <p className="text-gray-700">Username: {user.username}</p>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Address: {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
            <p className="text-gray-700">Phone: {user.phone}</p>
            <p className="text-gray-700">Website: {user.website}</p>
            <p className="text-gray-700">Company: {user.company.name}</p>
          </div>
        ) : (
          <div>Loading user details...</div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
