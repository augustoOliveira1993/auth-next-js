"use client"
import {Form, Formik} from "formik";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import Link from "next/link";
import * as Yup from 'yup'
import {useRouter} from "next/navigation";
import {useState} from "react";
import {renderScriptError} from "next/dist/server/dev/hot-reloader-webpack";

export default function Register() {
    const [error, setError] = useState<string>('')
    const [isFormSubmitting, setFormSubmitting] = useState<boolean>(false)
    const router = useRouter()
    const initalValues = {
        name: '',
        email: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('O campo o Nome é Obrigatório'),
        email: Yup.string()
            .email('Digite um e-mail válido')
            .required('O campo e-mail é obrigatório'),
        password: Yup.string().required('O campo senha é obrigatório'),
    })

    const handleSubmit = async (values: any, { resetForm }: any) => {
        setFormSubmitting(true)
        try {
            await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                })
            })
                .then(async (res) => {
                    const result = await res.json()
                    if (result.status === 201) {
                        alert(result.message)
                        router.push('/login')
                    } else {
                        renderScriptError(result.message)
                        resetForm()
                    }

                    setFormSubmitting(false)
                })
        } catch (e) {
            setFormSubmitting(false)
            renderScriptError('Error ao criar conta tente mais tarde!')
        }
    }

    const renderScriptError = (msg: string) => {
        setError(msg)
        setTimeout(() => {
            setError('')
        }, 3000)
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
                        <Input name="name" label="Nome" type="text" required/>
                        <Input name="email" label="E-mail" type="text" required/>
                        <Input name="password" label="Senha" type="password" required autocomplete="off"/>
                        <Button
                            text={isFormSubmitting ? 'Carregando...' : 'Inscrever-se'}
                            disabled={isFormSubmitting}
                        />
                        {!values.name && !values.email && !values.password && error && (
                            <span className="text-red-500 text-sm text-center">{error}</span>
                        )}
                        <span className="text-xs text-zinc-500">
                            Já possui conta?
                            <strong className="text-zinc-700">
                                <Link href="/login"> Entre</Link>
                            </strong>
                        </span>
                    </Form>
                )}
            </Formik>
        </main>
    );
}
