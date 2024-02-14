import React, { useState, useEffect } from 'react'; 
import { getUsers, deleteUser, createUser, updateUser } from '../api/users';
import { Link } from 'react-router-dom';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      console.log(`User with ID ${userId} deleted successfully.`);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  const confirmDeleteUser = (userId: number) => {
    setUserToDeleteId(userId);
    setShowDeleteConfirmation(true);
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirmation(false);
  };

  const handleCreateUser = async () => {
    try {
      const newUser = await createUser({ name: newUserName, email: newUserEmail });
      setUsers(prevUsers => [...prevUsers, newUser]);
      console.log('User created successfully:', newUser);
      setNewUserName('');
      setNewUserEmail('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      if (selectedUserId && updatedName && updatedEmail) {
        await updateUser(selectedUserId, { name: updatedName, email: updatedEmail });
        const updatedUsers = users.map(user =>
          user.id === selectedUserId ? { ...user, name: updatedName, email: updatedEmail } : user
        );
        setUsers(updatedUsers);
        setSelectedUserId(null);
        setUpdatedName('');
        setUpdatedEmail('');
        setShowUpdatePopup(false);
        console.log(`User with ID ${selectedUserId} updated successfully.`);
      }
    } catch (error) {
      console.error(`Error updating user with ID ${selectedUserId}:`, error);
    }
  };

  const openUpdatePopup = (userId: number, userName: string, userEmail: string) => {
    setSelectedUserId(userId);
    setUpdatedName(userName);
    setUpdatedEmail(userEmail);
    setShowUpdatePopup(true);
  };

  const cancelUpdateUser = () => {
    setShowUpdatePopup(false);
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ background: 'linear-gradient(to bottom right, #4F46E5, #843CF6)' }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">Users</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user: any) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
            <Link to={`/users/${user.id}`} className="block">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">Username: {user.username}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Address: {user.address ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}` : 'N/A'}</p>
              <p className="text-gray-600">Phone: {user.phone}</p>
              <p className="text-gray-600">Website: {user.website}</p>
            </Link>
            <button onClick={() => confirmDeleteUser(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">Delete</button>
            <button onClick={() => openUpdatePopup(user.id, user.name, user.email)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2">Update</button>
          </div>
        ))}

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold">Create New User</h2>
          <div className="mb-4">
            <label htmlFor="newUserName" className="block text-gray-700 font-bold">Name</label>
            <input type="text" id="newUserName" value={newUserName} onChange={e => setNewUserName(e.target.value)} className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="newUserEmail" className="block text-gray-700 font-bold">Email</label>
            <input type="email" id="newUserEmail" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500" required />
          </div>
          <button onClick={handleCreateUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create User</button>
        </div>
      </div>

      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => handleDeleteUser(userToDeleteId!)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              <button onClick={cancelDeleteUser} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showUpdatePopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Update User</h2>
            <div className="mb-4">
              <label htmlFor="updatedName" className="block text-gray-700 font-bold">Name</label>
              <input type="text" id="updatedName" value={updatedName} onChange={e => setUpdatedName(e.target.value)} className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="updatedEmail" className="block text-gray-700 font-bold">Email</label>
              <input type="email" id="updatedEmail" value={updatedEmail} onChange={e => setUpdatedEmail(e.target.value)} className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500" required />
            </div>
            <div className="flex justify-end">
              <button onClick={handleUpdateUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
              <button onClick={cancelUpdateUser} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
