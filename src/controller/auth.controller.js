import bcrypt from "bcrypt";
import { tokenMethods } from "../lib/tokenHelper.js";
import { reader, writer } from "../lib/fsWorking.js";

const users=reader('users.json');
// signup------>
export const signUp=(req,res)=>{
    try {
        const {username, password}=req.body;
        const hashPassword=bcrypt.hashSync(String(password), +process.env.SALT_ROUNDS);
        const token=tokenMethods.sign({id:users.at(-1)?.id+1||1, username, hashPassword, isAdmin:false}, process.env.SECRET_KEY);
        if(token&&hashPassword){
            users.push({"id":users.at(-1)?.id+1||1, isAdmin:false , money:0, username, password:hashPassword})
            console.log(users);
            writer('users.json', users);
 return res.status(201).json({
    "status": 201,
    "data": {
            token
          },
     "msg": "CREATED"
  });
        }
    } catch (error) {
        console.log(error.message);
        res.send({error:error.message})
    }
};
// signin------>
export const signIn=async (req, res)=>{
    try {
        const {username, password}=req.body;
        const user=users.find(u=>u.username==username);
        if(!user)return res.status(400).json({
            "status": 400,
            "data": null,
            "msg": "username yoki password xato"
          });
        const passwordCompare=await bcrypt.compare(String(password), user.password);
        if(!passwordCompare)return res.status(400).json({
            "status": 400,
            "data": null,
            "msg": "username yoki password xato"
          });
          const token=tokenMethods.sign({ id:user.id, username:user.username, password:user.password , isAdmin:user.isAdmin}, process.env.SECRET_KEY);
        res.send({
            "status": 200,
            "data": {
                token
                  },
             "msg": "OK"
          });
    } catch (error) {
        console.log(error.message);
        res.send({error:error.message});
    }
};