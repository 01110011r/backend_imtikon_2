import { reader } from "../lib/fsWorking.js";

export const authMiddleware=(req, res, next)=>{
try {
    const users=reader('users.json');
    const {username, password}=req.body;
   
    if (!username||!password) {
      return  res.status(400).json({
            status: 400,
            data: null,
            msg: "Malumot to'liq emas!"
          });
    }
    if (users.some(u=>u.username==username)) {
      return res.status(400).json({
        status: 400,
        data: null,
        msg: "Bu username allaqachon band qilingan"
      });
    }
    next();
} catch (error) {
    console.log('authMiddleware:--->'+error.message);
}
};

export const addProductMiddleware=(req, res, next)=>{
  try {
    const {name, price, count}=req.body;
    if(!name||!price||!count)return res.status(400).json({
        "status": 400,
        "data": null,
        "msg": "ma'lumotlar xato kiritildi"
      });
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export const tokenForMiddleware=(req, res, next)=>{
  try {
    const {token}=req.headers;
    if(!token)return res.status(401).json({
      "status": 401,
      "data": null,
      "msg": "autentifikatsion token mavjud emas"
    }
    );
    next();
  } catch (error) {
    console.log(error.message);
  }
}