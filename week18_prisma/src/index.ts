import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

const adduser = async () => {
    await client.users.create({
        data: {
            username: 'Suraj',
            password: '9hdn92u21',
            email: 'suraj2000delhi@gmail.com'
        }
    })
}

const delete_user = async () => {
    await client.users.delete({
        where: {
            id: 1
        }
    })
}
const update_user = async () => {
    await client.users.update({
        where: {
            id: 1
        },
        data:{
            username : "surajsharma1"
        }
    })
}
const find_user = async () => {
    const response = await client.users.findFirst({
        where: {
            username:"Suraj"
        },
    })

    console.log(response);
    
}
find_user()
// adduser()
// update_user()
// delete_user()

console.log('user added');