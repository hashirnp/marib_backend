const express = require('express');

const { connectDB } = require("./config/db")
const cors = require('cors')
const userRouter=require('./routes/userRouter.js')
const staffRouter=require('./routes/staffRouter.js')
const superStaffRouter=require('./routes/superStaffRouter.js')
const authRouter=require('./routes/authRouter.js')


connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "Marib API running..." });
})

app.use('/api/user',userRouter);
app.use('/api/staff', staffRouter);
app.use('/api/superStaff', superStaffRouter);
app.use('/api/auth',authRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running in ${process.env.PORT}`);
})
