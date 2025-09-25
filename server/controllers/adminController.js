import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check admin credentials from environment variables
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { username }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify admin token
export const verifyAdminToken = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    res.status(200).json({ 
      message: 'Token valid',
      admin: { username: decoded.username }
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Get admin dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const Restaurant = (await import('../models/Restaurant.js')).default;
    const Food = (await import('../models/Food.js')).default;
    const Order = (await import('../models/Order.js')).default;
    const User = (await import('../models/User.js')).default;

    const [restaurantCount, foodCount, orderCount, userCount] = await Promise.all([
      Restaurant.countDocuments({ isActive: true }),
      Food.countDocuments({ isActive: true }),
      Order.countDocuments(),
      User.countDocuments()
    ]);

    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber totalAmount createdAt status');

    // Calculate total revenue
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$finalAmount' } } }
    ]);

    res.status(200).json({
      stats: {
        restaurants: restaurantCount,
        foods: foodCount,
        orders: orderCount,
        users: userCount,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentOrders
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const Order = (await import('../models/Order.js')).default;
    const User = (await import('../models/User.js')).default;
    
    const { page = 1, limit = 20, status = '', search = '' } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    // Get user details for each order
    const transformedOrders = await Promise.all(
      orders.map(async (order) => {
        let userName = 'Unknown User';
        let userEmail = 'No email';
        
        try {
          const user = await User.findOne({ clerkId: order.clerkUserId });
          if (user) {
            userName = user.name || 'Unknown User';
            userEmail = user.email || 'No email';
          }
        } catch (userError) {
          console.error('Error fetching user for order:', order._id, userError);
        }
        
        return {
          ...order.toObject(),
          userName,
          userEmail
        };
      })
    );

    res.status(200).json({
      orders: transformedOrders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const Order = (await import('../models/Order.js')).default;
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users for admin
export const getAllUsers = async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const Order = (await import('../models/Order.js')).default;
    
    // Create some test users if none exist (for testing purposes)
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const testUsers = [
        {
          clerkUserId: 'user_test1',
          email: 'john.doe@example.com',
          name: 'John Doe',
          isActive: true
        },
        {
          clerkUserId: 'user_test2',
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          isActive: true
        },
        {
          clerkUserId: 'user_test3',
          email: 'bob.wilson@example.com',
          name: 'Bob Wilson',
          isActive: false
        }
      ];
      
      await User.insertMany(testUsers);
      console.log('Created test users for demo purposes');
    }
    
    const { page = 1, limit = 20, search = '' } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { clerkUserId: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    // Get order history for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ clerkUserId: user.clerkUserId });
        return {
          ...user.toObject(),
          orderHistory: orders,
          totalOrders: orders.length,
          totalSpent: orders.reduce((sum, order) => sum + (order.finalAmount || 0), 0)
        };
      })
    );

    res.status(200).json({
      users: usersWithStats,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user status
export const updateUserStatus = async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive, updatedAt: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User status updated successfully', user });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const Order = (await import('../models/Order.js')).default;
    const { userId } = req.params;

    // Check if user has any orders
    const orderCount = await Order.countDocuments({ userId });
    
    if (orderCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete user with existing orders. Consider deactivating instead.' 
      });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};