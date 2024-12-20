import expres from "express"
const router = expres.Router()
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import bcrypt from "bcrypt"

const client = new PrismaClient()
//  app/v1/user/signup
// @ts-ignore
router.post('/signup', async (req, res) => {
        const { username, password, email } = req.body

        // zod validation schema
        const userSchema = z.object({
            username: z.string().min(6).max(20),
            email: z.string().email(),
            password: z.string().min(8).max(20)
        })

        //user input 
        const user_input = {
            username: username,
            email: email,
            password: password
        };
        // validate user input 
        const validateData = userSchema.parse(user_input)

        const hashedpassword = await bcrypt.hash(validateData.password, 10);

        if (validateData) {
            const response = await client.users.create({
                data: {
                    username: validateData.username,
                    email: validateData.email,
                    password: hashedpassword
                }
            })
            console.log(response);
        }
})
//  app/v1/user/signup
router.post('/signin', async (req, res) => {

})

export default router