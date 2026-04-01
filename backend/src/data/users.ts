import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin Manager',
    email: 'admin@bookverse.com',
    password: 'admin', // Will be hashed in seeder
    role: 'admin',
  },
  {
    name: 'Support Agent',
    email: 'csr@bookverse.com',
    password: 'csr',
    role: 'csr',
  },
  {
    name: 'Jane Austen',
    email: 'jane@example.com',
    password: 'password',
    role: 'customer',
  },
  {
    name: 'Marcus Aurelius',
    email: 'marcus@example.com',
    password: 'password',
    role: 'customer',
  },
];

export default users;
