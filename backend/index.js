const http=require('http');
const express=require('express');
const app=express();
const httpserver=http.createServer(app);
require('dotenv').config();

const { initSocket } = require('./utils/socket');
initSocket(httpserver);

require('./utils/db');
var cors = require('cors')

// Routes

const userRoutes=require('./routes/user.routes');
const productRoutes=require('./routes/product.routes');
const productClick=require('./routes/productClick.routes');
const chatRoutes=require('./routes/chats.routes')
const paymentRoutes=require('./routes/payment.routes');


// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('uploads'))
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/productclick', productClick);
app.use('/api/chats',chatRoutes);
app.use('/api/payments', paymentRoutes);




const PORT = process.env.PORT || 6500;

httpserver.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





