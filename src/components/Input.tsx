"use client"
import React from 'react';
import {ErrorMessage, Field} from "formik";

interface InputProps {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    autocomplete?: string;
}
export default function Input({ name, label, type, required, ...props }: InputProps) {
    return (
        <div className="flex flex-col">
            <div className="cappitalized">
                { label || name } <span className="text-red-500">{ required && '*'}</span>
            </div>
            <Field
                name={name}
                type={type}
                {...props}
                className="p-2 rounded border-zinc-400  border border-solid outline-0 focus:border-blue-500"
            />
            <div className="text-red-500 text-xs mt-1">
                <ErrorMessage
                    name={name}
                />
            </div>
        </div>
    );
}

