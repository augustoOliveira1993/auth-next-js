import UserModel from '@/models/user.model'
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connection from '@/ultils/db'


export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        if (!name || !email || !password) {
            return NextResponse.json({ message: "Preencha todos os campos" });
        }
        await connection();

        const emailExists = await UserModel.findOne({ email });
        if (emailExists) {
            return NextResponse.json({
                message: "Email já cadastrado",
                status: 409,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ name, email, password: hashedPassword });
        await user.save();
        return NextResponse.json({
            message: "Usuário criado com sucesso",
            status: 201,
        });
    } catch (e) {
        return NextResponse.json({
            message: "Erro ao criar usuário",
            status: 500
        });
    }
}
