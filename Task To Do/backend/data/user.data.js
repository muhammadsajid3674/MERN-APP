const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Jason Brody',
        email: 'jason@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Ajay Ghale',
        email: 'ajay@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]

module.exports = users