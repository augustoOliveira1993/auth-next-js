"use client"
import {Form, Formik} from "formik";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import Link from "next/link";
import * as Yup from 'yup'
import {useEffect, useState} from "react";
import {signIn, SignInResponse, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Login() {
    const [error, setError] = useState<string>('')
    const [isFormSubmitting, setFormSubmitting] = useState<boolean>(false)
    const router = useRouter()
    const {status} = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/')
        }
    }, [status, router])

    if (status !== 'unauthenticated') {
        return null
    }
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

    const handleSubmit = (values: any, {resetForm}: any) => {
        setFormSubmitting(true)
        try {
            signIn('Credentials', {...values, redirect: false}).then(
                ({error}: SignInResponse) => {
                    if (!error) {
                        router.push('/')
                    } else {
                        renderScriptError(error.replace('Error: ', ''))
                        setError(error.replace('Error: ', ''))
                        setTimeout(() => {
                            setError('')
                        }, 3000)
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
                        <Input name="email" label="E-mail" type="text" required/>
                        <Input name="password" label="Senha" type="password" required/>
                        <Button
                            text={isFormSubmitting ? 'Entrando...' : 'Entrar'}
                            disabled={isFormSubmitting}
                            className="bg-green-500 text-white rounded p-2 cursor-pointer"
                        />
                        {!values.email && !values.password && error && (
                            <span className="text-red-500 text-sm text-center">{error}</span>
                        )}
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
