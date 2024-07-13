const path=require('path');
const fs=require('fs');

const filePath=path.join(__dirname,'..','data','restaurants.json');

function getStoredRestaurant(){
    
    const fileData=fs.readFileSync(filePath);
    const storedrestaurants=JSON.parse(fileData);
    return storedrestaurants;
};

function storeRestaurants(storableRestaurant){
    fs.writeFileSync(filePath,JSON.stringify(storableRestaurant));
}

module.exports={
    getStoredRestaurant:getStoredRestaurant,
    storeRestaurants:storeRestaurants
};