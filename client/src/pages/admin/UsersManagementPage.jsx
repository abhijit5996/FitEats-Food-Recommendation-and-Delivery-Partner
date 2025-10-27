import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { endpoints } from '../../config/api';
import { useAdmin } from '../../context/AdminContext';

const UsersManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const { getAuthHeaders, isAuthenticated, isLoading } = useAdmin();

  useEffect(() => {
    // Wait for admin verification to finish
    if (isLoading) return;
    if (!isAuthenticated) return;

    fetchUsers();
  }, [isLoading, isAuthenticated]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users from:', endpoints.admin.users());
      console.log('Auth headers:', getAuthHeaders());
      
      const response = await fetch(endpoints.admin.users(), {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Users data received:', data);
      console.log('Number of users:', data.users?.length || 0);
      
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId, isActive) => {
    try {
      const response = await fetch(endpoints.admin.updateUserStatus(userId), {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (response.ok) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, isActive } : user
        ));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user status');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(endpoints.admin.deleteUser ? endpoints.admin.deleteUser(userId) : `${endpoints.admin.users()}/${userId}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.clerkUserId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUserStats = (user) => {
    return {
      totalOrders: user.orderHistory?.length || 0,
      totalSpent: user.orderHistory?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0,
      lastOrderDate: user.orderHistory?.length > 0 ? 
        Math.max(...user.orderHistory.map(order => new Date(order.createdAt).getTime())) : null
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#1a1a2e] to-[#2c2c54]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Users Management</h1>
          <p className="text-gray-300">Manage and monitor all platform users</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search by Email, Name, or Clerk ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-blue-300 text-sm font-medium">Total Users</h3>
            <p className="text-white text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-green-300 text-sm font-medium">Active Users</h3>
            <p className="text-white text-2xl font-bold">{users.filter(u => u.isActive).length}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-yellow-300 text-sm font-medium">New This Month</h3>
            <p className="text-white text-2xl font-bold">
              {users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-purple-300 text-sm font-medium">Inactive Users</h3>
            <p className="text-white text-2xl font-bold">{users.filter(u => !u.isActive).length}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffc107]"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-gray-400 text-lg mb-2">No users found</p>
            <p className="text-gray-500 text-sm">Users will appear here once they register on the platform.</p>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredUsers.map((user) => {
                    const stats = getUserStats(user);
                    return (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#ffc107] to-[#ff6b35] rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-bold">
                                {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-white">{user.name || 'N/A'}</div>
                              <div className="text-gray-400 text-xs">ID: {user.clerkUserId?.slice(-8) || 'N/A'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {stats.totalOrders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {formatCurrency(stats.totalSpent)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserDetails(true);
                            }}
                            className="text-[#ffc107] hover:text-[#e6ac00] font-medium"
                          >
                            View
                          </button>
                          <button
                            onClick={() => updateUserStatus(user._id, !user.isActive)}
                            className={`font-medium ${
                              user.isActive 
                                ? 'text-red-400 hover:text-red-300' 
                                : 'text-green-400 hover:text-green-300'
                            }`}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-400 hover:text-red-300 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Details Modal */}
        {showUserDetails && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1a1a2e] rounded-lg border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-white/20">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">User Details</h3>
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Name</p>
                    <p className="text-white font-medium">{selectedUser.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{selectedUser.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedUser.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Joined Date</p>
                    <p className="text-white">{formatDate(selectedUser.createdAt)}</p>
                  </div>
                </div>

                {/* User Stats */}
                <div>
                  <h4 className="text-white font-medium mb-3">User Statistics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 p-3 rounded">
                      <p className="text-gray-400 text-sm">Total Orders</p>
                      <p className="text-white font-bold">{getUserStats(selectedUser).totalOrders}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                      <p className="text-gray-400 text-sm">Total Spent</p>
                      <p className="text-white font-bold">{formatCurrency(getUserStats(selectedUser).totalSpent)}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                      <p className="text-gray-400 text-sm">Last Order</p>
                      <p className="text-white font-bold">
                        {getUserStats(selectedUser).lastOrderDate 
                          ? formatDate(getUserStats(selectedUser).lastOrderDate)
                          : 'Never'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                {selectedUser.preferences && (
                  <div>
                    <h4 className="text-white font-medium mb-3">Preferences</h4>
                    <div className="bg-white/5 p-4 rounded space-y-2">
                      <div>
                        <p className="text-gray-400 text-sm">Health Conscious</p>
                        <p className="text-white">{selectedUser.preferences.healthConscious ? 'Yes' : 'No'}</p>
                      </div>
                      {selectedUser.preferences.cuisinePreferences?.length > 0 && (
                        <div>
                          <p className="text-gray-400 text-sm">Cuisine Preferences</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedUser.preferences.cuisinePreferences.map((cuisine, index) => (
                              <span key={index} className="bg-[#ffc107]/20 text-[#ffc107] px-2 py-1 rounded-full text-xs">
                                {cuisine}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedUser.preferences.dietaryRestrictions?.length > 0 && (
                        <div>
                          <p className="text-gray-400 text-sm">Dietary Restrictions</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedUser.preferences.dietaryRestrictions.map((restriction, index) => (
                              <span key={index} className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                                {restriction}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagementPage;