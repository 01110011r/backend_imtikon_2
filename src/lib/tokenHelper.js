import Jwt from "jsonwebtoken";
export const tokenMethods={
    sign:(payload, secretkey, options={})=>{
        try {
            return Jwt.sign(payload, secretkey, options);
        } catch (error) {
            console.log('Jwt sign-->'+error.message);
        }
    },
    verify:(token, secretkey)=>{
        try {
            return Jwt.verify(token, secretkey);
        } catch (error) {
            console.log('Jwt verify-->'+error.message);
        }
    }
}