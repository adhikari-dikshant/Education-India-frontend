import { PrismaClient } from '@prisma/client';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
const crypto = require('crypto')
import {sendphone} from '@/helper/mailer'
import jwt from "jsonwebtoken";
import axios from 'axios';
const prisma = new PrismaClient();
<<<<<<< HEAD
export async function POST(request) {
=======

export async function POST(request){
>>>>>>> fcb10677f306f8a897e785597209abbbd7f9c124
    try {

     
            
        const reqBody = await request.json()
<<<<<<< HEAD
        const { name, phone, password } = reqBody
        
=======
        const { name,email, password} = reqBody
>>>>>>> fcb10677f306f8a897e785597209abbbd7f9c124
        console.log(reqBody)
            
        const user = await prisma.user.findUnique({
            where: {
<<<<<<< HEAD
                phone,
=======
              email,
>>>>>>> fcb10677f306f8a897e785597209abbbd7f9c124
            },
       })
       if(!user){
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const hashedToken = crypto.randomInt(100000, 999999);
        const user=await prisma.user.create({
            data:{
            
            phone:phone,
            name:name,
            password:hashedPassword,
            verifyTokenString:hashedToken.toString()
            }
            
            
        })
        const tokenData = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            verified:user.verified,
        }   
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "14d"})
        console.log(token)
      axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.SMS_API_KEY}&route=otp&variables_values=${hashedToken}&flash=0&numbers=${user.phone}`)
  .then(message => console.log(message.sid))
  .catch(error => console.error(error));
        const response=NextResponse.json({
            message: "Sign Up successful",
            success: true,
        });
        await response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
            
        return response

<<<<<<< HEAD
        }
        else {
            return NextResponse.json({ 'error': 'phone already In use' }, { status: 405 })
        }
=======
       }
       else{
        return NextResponse.json({'error':'Email already In use'},{status:405})
       }
>>>>>>> fcb10677f306f8a897e785597209abbbd7f9c124



    }
    catch (err) {
        console.log(err)
        return NextResponse.json(err, {status: 500});
    }
    
}
export function GET(){
    return NextResponse.json({"methode not allowed":'no'},{status:500})
}