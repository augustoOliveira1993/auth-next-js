"use client"
import {Form, Formik} from "formik";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import Link from "next/link";
import * as Yup from 'yup'

export default function Login() {
    const initalValues = {
        email: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Digite um e-mail válido')
            .required('O campo e-mail é obrigatório'),
        password: Yup.string().required('O campo senha é obrigatório'),
    })

    const handleSubmit = () => {

    }
    return (
        <main className="min-h-screen flex items-center justify-center">
            <Formik
                initialValues={initalValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({values}) => (
                    <Form noValidate className="flex flex-col gap-2 p-4 border border-zinc-300 min-w-[300px] bg-white">
                        <Input name="email" label="E-mail" type="text" required/>
                        <Input name="password" label="Senha" type="password" required/>
                        <Button text="Entrar"/>
                        <span className="text-xs text-zinc-500">
                            Não possui uma conta?
                            <strong className="text-zinc-700">
                                <Link href="/register"> Inscreva-se</Link>
                            </strong>
                        </span>
                    </Form>
                )}
            </Formik>
        </main>
    );
}
