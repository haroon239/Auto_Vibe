const http=require('http');
const { Server } = require('socket.io');
const express=require('express');
const app=express();
const httpserver=http.createServer(app);

const io=new Server(httpserver, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
require('./db');
const multer  = require('multer')
var cors = require('cors')
const chat=require('./models/chat');
const usersRegistration=require("./controllers/userscontroller");
const sellingproducts=require('./controllers/productscontroller');
const productclick=require('./controllers/clickcontroller');
const chats=require('./controllers/chating');
const payment=require('./controllers/paymentcontroller');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('uploads'))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() ;
      cb(null, uniqueSuffix + '-' + file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })


app.post('/signup', usersRegistration.signup);
app.post('/signin', usersRegistration.signin);
app.patch('/user/:userid',usersRegistration.updateuser)
app.get('/adminDashboard/:userid', usersRegistration.AdminDashboard)
app.post('/products', upload.single('image'), sellingproducts.products);
app.get('/getproducts', sellingproducts.getproducts);
app.get('/productdetail/:productId', sellingproducts.detailproduct)
app.get('/products/:userid', sellingproducts.userproducts)
app.patch('/updateproduct/:userid',upload.single('image'), sellingproducts.updateproduct);
app.delete('/deleteproduct/:userid', sellingproducts.deleteproduct);
app.post('/likedproduct',usersRegistration.likedproduct)
app.post('/likeproductlist',usersRegistration.likedproductlist);
app.post('/removelikeproductlist',usersRegistration.removelikedproduct);
app.get('/search', sellingproducts.searchfilter);
app.get('/verifyemail/:userid', usersRegistration.userverify)
app.post('/sendmessage', chats.sendMessage)
app.get('/getmessage/:productid/:userid', chats.getMessage)

app.get('/allparticipants/:productid', chats.getallparticipants);
app.post('/productclick',  productclick.productclick);
app.get('/getclick/:productId',productclick.getclick);
app.post('/api/create-checkout-session',  payment.paymentintegrate);
app.post('/paymentAdd', payment.addPayment );
app.get('/getpayments/:userid',payment.getpayments);







const userSocketMap = {};

io.on('connection', (socket) => {
  console.log("a user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  socket.on('disconnect', () => {
    console.log("socket disconnected:", socket.id);
    for (const [key, value] of Object.entries(userSocketMap)) {
      if (value === socket.id) {
        delete userSocketMap[key];
        break;
      }
    }
  });

  socket.on('sendmessage', (data, callback) => {
    const receiverSocketId = userSocketMap[data.receiver];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('message', data);
      callback({ success: true, message: "Message sent successfully." }); // Send acknowledgment to the frontend
    } else {
      console.error("Receiver's socket not found.");
      callback({ success: false, message: "Receiver's socket not found." }); // Send error acknowledgment to the frontend
    }

    socket.emit('message',data);
  });
});



const PORT = process.env.PORT || 6500;

httpserver.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports.io = io;


