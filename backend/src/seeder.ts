import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db';
import User from './models/User';
import Book from './models/Book';
import Order from './models/Order';
import Ticket from './models/Ticket';
import users from './data/users';
import books from './data/books';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Ticket.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    const createdUsers = [];
    
    // Hash passwords before creation
    for (const u of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(u.password, salt);
      const createdUser = await User.create({
        ...u,
        password: hashedPassword
      });
      createdUsers.push(createdUser);
    }

    const adminUser = createdUsers[0]._id;
    const customerUser = createdUsers[2]._id;

    const sampleBooks = books.map((book) => {
      const { id, ...bookData } = book; // Drop 'b1', 'b2' etc so Mongoose auto-generates ObjectIds
      return { ...bookData };
    });

    const insertedBooks = await Book.insertMany(sampleBooks);

    // Create a mock order
    const order = new Order({
      userId: customerUser,
      items: [
        {
          bookId: insertedBooks[0]._id,
          quantity: 1,
          price: insertedBooks[0].price
        }
      ],
      shippingAddress: {
        address: '123 Bookworm Lane',
        city: 'Colombo',
        state: 'Western',
        zipCode: '00100'
      },
      paymentMethod: 'Credit Card',
      total: insertedBooks[0].price + 4.99,
      status: 'Processing'
    });

    await order.save();

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Ticket.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destroy: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
