// Script to create initial superadmin account
// Run: node scripts/create-superadmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alpha-station-dev';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'teacher', 'student'], default: 'student' },
  firstName: String,
  lastName: String,
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createSuperadmin() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if any users exist
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('❌ Users already exist in the database.');
      console.log('   Please use the web interface at http://localhost:3000/setup');
      console.log('   Or drop the database to start fresh.\n');
      process.exit(1);
    }

    console.log('📝 Create Superadmin Account\n');
    
    const email = await question('Email: ');
    const password = await question('Password (min 6 chars): ');
    const firstName = await question('First Name (optional): ');
    const lastName = await question('Last Name (optional): ');

    if (!email || !password) {
      console.log('\n❌ Email and password are required!');
      process.exit(1);
    }

    if (password.length < 6) {
      console.log('\n❌ Password must be at least 6 characters!');
      process.exit(1);
    }

    console.log('\n🔐 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('👤 Creating superadmin...');
    const superadmin = new User({
      email,
      password: hashedPassword,
      role: 'superadmin',
      firstName: firstName || 'Super',
      lastName: lastName || 'Admin',
      isActive: true,
    });

    await superadmin.save();

    console.log('\n✅ Superadmin created successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   Role: superadmin`);
    console.log('\n🚀 You can now login at http://localhost:3000/login\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
    await mongoose.connection.close();
    process.exit(0);
  }
}

createSuperadmin();
