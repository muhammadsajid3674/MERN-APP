const express = require('express');
const taskRouter = require('./routes/task.routes');
const userRouter = require('./routes/user.routes');
const { notFound, errorHandler } = require('./middleware/error.middeware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())

app.get('/', (req, res) => {
    res.send("<h1>API WORKS!</h2>")
})

app.use('/api/todo', taskRouter)
app.use('/api/user', userRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`))