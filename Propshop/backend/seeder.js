import dotenv from 'dotenv'
import connectDB from './config/db.js';
import sampleProducts from './data/products.js';
import users from './data/user.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js'
import colors from 'colors'

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUser = await User.insertMany(users);
        const adminUser = createdUser[0]._id;

        const sampleProduct = sampleProducts.map(e => {
            return { ...e, user: adminUser }
        })
        await Product.insertMany(sampleProduct);
        console.log('Data Imported!'.green.inverse);
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.underline.bold);
        process.exit(1)
    };
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data Destroyed!'.green.inverse);
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.underline.bold);
        process.exit(1)
    };
};

if (process.argv[2] == '-d') {
    destroyData();
} else {
    importData();
};