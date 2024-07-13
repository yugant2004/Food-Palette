const express=require('express');
const router=express.Router();


router.get('/about',function (req,res){
    // const htmlFilePath1=path.join(__dirname,'views','about.html');
    // res.sendFile(htmlFilePath1);
    res.render('about');
 });
 router.get('/index',function (req,res){
   //  const htmlFilePath2=path.join(__dirname,'views','index.html');
   //  res.sendFile(htmlFilePath2);
   res.render('index');
 });
 
 

 module.exports=router;