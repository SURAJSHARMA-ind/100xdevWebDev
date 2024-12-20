import { PrismaClient } from "@prisma/client";
import { log } from "console";

const client = new PrismaClient()

const add_user = async () => {
    await client.users.create({
        data: {
            username: 'Suraj',
            password: '9hdn92u21',
            email: 'suraj2000delhi@gmail.com'
        }
    })
}
const add_Todo = async () => {

    await client.todos.create({
        data: {
            title: 'Todo3',
            description: 'lorem ipsum dolar',
            status: true,
            user_id: 3
        }
    })
}

// add_Todo()

const get_Todo = async () => {
    const user_todos = await client.todos.findMany({
        where: {
            user_id: 3
        }
    })
    console.log(user_todos)
}
// get_Todo()

const get_todousers_detail = async () => {
    const response = await client.todos.findMany(
        {
            where: {
                user_id: 3,
            },
            select: {
                users: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
                title: true,
                description: true,
                status: true
            }
        });
    console.log(response);
}

get_todousers_detail()

const delete_user = async () => {
    await client.users.delete({
        where: {
            id: 3
        }
    })
}
const update_user = async () => {
    await client.users.update({
        where: {
            id: 1
        },
        data: {
            username: "surajsharma1"
        }
    })
}
const find_user = async () => {
    const response = await client.users.findFirst({
        where: {
            username: "Suraj"
        },
    })

    console.log(response);

}
// find_user()
// add_user()
// update_user()
// delete_user()

// console.log('user added');