import { reader, writer } from "../lib/fsWorking.js";
import { tokenMethods } from "../lib/tokenHelper.js";
const users=reader('users.json');
const Products=reader('products.json');

// product post ----->
export const productsPost=(req, res)=>{
    try {
        const {token}=req.headers;
        const {name, price, count}=req.body;
        const admin=tokenMethods.verify(token, process.env.SECRET_KEY);
        if(admin.isAdmin){
if(Products.some(p=>p.name.toLowerCase()==name.toLowerCase())){
    Products.forEach(p=> {
        if(p.name==name){
            p.name=name
            p.price=price
            p.count+=count
        }
    });
}else{
    Products.push({
        "id":Products.at(-1)?.id+1||1,
        name, price, count
    });
}
    writer('products.json', Products);
    return res.status(201).json({
    "status": 201,
    "data": {
        "id":Products.at(-1)?.id||1,
        name, price, count:Products.at(-1).count
    },
    "msg": "CREATED"
 });
        }
        res.status(400).json({
                "status": 400,
                "data": null,
                "msg": "Faqat admin product qo'shishi mumkin!"
             }
        );
    } catch (error) {
        console.log(error);
        res.status(403).json({
            "status": 403,
            "data": null,
            "msg": "autentifikatsion token yaroqsiz"
          })
    }
};



// user account get----->
 export const userAccountGet=(req, res)=>{
    try {
        const {token}=req.headers;
        const {username}=tokenMethods.verify(token, process.env.SECRET_KEY);
        const user=users.find(u=>u.username==username);
   if(!user)return res.status(404).json({
    "status": 404,
    "data": null,
    "msg": "user hisob raqami topilmadi"
  });
       res.send({
        "status": 200,
        "data": {
          "username": user.username,
          "account": user.money
        },
        "msg": "OK"
      }); 
    } catch (error) {
        console.log(error.massage);
        res.status(403).json({
            "status": 403,
            "data": null,
            "msg": "autentifikatsion token yaroqsiz"
          })
    }
 }




// user hisobini to'ldirishi------>
export const userMoneyAdd=(req, res)=>{
    try {
        const total=req.body.total;
        const {token}=req.headers;
        const id=tokenMethods.verify(token, process.env.SECRET_KEY).id;
        const user=users.find(u=>u.id==id);
        if(user&&!user.isAdmin){
            user.money+=total;
            writer('users.json', users);
            return res.send({
                "status": 200,
                "data": {
                  "username": user.username,
                  "account": user.money
                },
                "msg": "OK"
              });
        }

        res.status(404).json({
            "status": 404,
            "data": null,
            "msg": "user hisob raqami topilmadi"
          });
    } catch (error) {
        console.log(error.massage);
        res.status(403).json({
            "status": 403,
            "data": null,
            "msg": "autentifikatsion token yaroqsiz"
          })
    }
}




// buy product----->
export const userBuyProduct=(req, res)=>{
try {
    const token=req.headers.token;
    const {id}=tokenMethods.verify(token, process.env.SECRET_KEY);
    const buy=req.body;
    if(buy.name&&buy.count){
    const user=users.find(u=>u.id==id);
    const product=Products.find(p=>p.name.toLowerCase()==buy.name.toLowerCase());
if(user&&user.money>=product.price*buy.count&&buy.count<=product.count){
    product.count-=buy.count;
    user.money-=buy.count*product.price;
    writer('products.json', Products);
    writer('users.json', users);
    return res.status(201).json({
        "status": 201,
        "data": {
          "id": product.id,
          "name": buy.name,
          "count": buy.count
        },
        "msg": "CREATED"
      })

}
    }
res.status(400).json({
    "status": 400,
    "data": null,
    "msg": "Ma'lumot xato kiritildi"
  });
} catch (error) {
    console.log(error.massage);
    res.status(403).json({
        "status": 403,
        "data": null,
        "msg": "autentifikatsion token yaroqsiz"
      })
}
}


// 
export const userGetProductSee=(req, res)=>{
   try {
    const data=reader('products.json');
    res.send({
        "status": 200,
        data,
        "msg": "OK"
      })
   } catch (error) {
    console.log(error.massage);
   }
    };