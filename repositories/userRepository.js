import prisma from "../lib/prisma.js"

const registerUser = async (userRegData) => {
    try {

        // check with prev mail 
        const existsUser = await prisma.users.findUnique({
            where: {
                emailid: userRegData.emailid
            }
        })

        if (existsUser) {
            throw new Error("User already exists with this email");
        }

        const addUser = await prisma.users.create({
            data: userRegData
        })

        return addUser


    } catch (error) {
        console.error("Error registering user:", error.message);
        throw error;
    }

}

export {
    registerUser
}