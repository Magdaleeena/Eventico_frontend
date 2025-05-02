import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserProfile } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const DeleteProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleConfirmDelete = async () => {
    try {
      await deleteUserProfile();
      logout();
      navigate('/signout');
    } catch (error) {
      alert('Error deleting profile. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">Delete Your Profile</h2>
      <p className="text-gray-700 mb-6">
        This action is permanent and cannot be undone. All your data will be removed.
      </p>

      <div className="flex justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmDelete}
          className="flex-1 bg-pink-700 text-white py-2 rounded hover:bg-pink-800"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteProfile;
