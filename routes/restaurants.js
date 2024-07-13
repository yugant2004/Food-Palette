const express=require('express');
const uuid=require('uuid');
const resData=require('../util/restaurant-file');

const router=express.Router();


router.get('/restaurants',function (req,res){
    let order=req.query.order;
    let curOrder='desc';
    if(order != 'asc' && order != 'desc'){
        order='asc';
    }
    if(order=='desc'){
        curOrder='asc';
    }
    //const htmlFilePath=path.join(__dirname,'views','restaurants.html');
    //res.sendFile(htmlFilePath);
  //  const filePath=path.join(__dirname,'data','restaurants.json');
//const fileData=fs.readFileSync(filePath);
//const storedrestaurants=JSON.parse(fileData);

const storedrestaurants=resData.getStoredRestaurant();
 storedrestaurants.sort(function(resA,resB){
    if(order=='asc' && resA.name > resB.name){
        return 1;
    }else if(order=='desc' && resB.name > resA.name){
        return 1;
    }
    return -1;
 });
    res.render('restaurants',{numberofrestaurants:storedrestaurants.length,
        restaurants:storedrestaurants,
        curOrder:curOrder});
});


router.get('/restaurants/:id',function(req,res){
  const restaurantId=req.params.id;
  
  const storedrestaurants=resData.getStoredRestaurant();
  for(const restaurant of storedrestaurants){
    if(restaurant.id === restaurantId){
     return res.render('restaurants-detail',{restaurant: restaurant});
    }
     
  }
  res.status(404).render('404');
   
});




router.post('/recommend',function(req,res){
const restaurant=req.body;
restaurant.id=uuid.v4();

const restaurants=resData.getStoredRestaurant();
restaurants.push(restaurant);

resData.storeRestaurants(restaurants);

res.redirect('/confirm');
});

router.get('/confirm',function (req,res){
    //const htmlFilePath3=path.join(__dirname,'views','confirm.html');
    //res.sendFile(htmlFilePath3);
    res.render('confirm');
});

router.get('/recommend',function (req,res){
  //  const htmlFilePath4=path.join(__dirname,'views','recommend.html');
  //  res.sendFile(htmlFilePath4);
  res.render('recommend');

});

module.exports=router;