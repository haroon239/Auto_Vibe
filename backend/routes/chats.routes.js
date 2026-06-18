const express =require('express')
const router=express.Router();

const chats=require('../controllers/chating');

router.post('/sendmessage',chats.sendMessage);
router.get('/getmessage/:productid/:userid', chats.getMessage);
router.get('/allparticipants/:productid', chats.getallparticipants);

module.exports=router;