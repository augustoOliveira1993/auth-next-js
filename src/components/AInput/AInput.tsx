import {ElementType, InputHTMLAttributes} from "react";
import { twMerge } from 'tailwind-merge'
interface AInputProps extends InputHTMLAttributes<HTMLInputElement> {
    iconLeft?: ElementType;
    iconRight?: ElementType;
}
export const AInput = ({ iconLeft: IconLeft, iconRight: IconRight, ...props }: AInputProps) => {
    return (
        <div className="relative">
            {IconLeft && <IconLeft className="absolute left-2 top-2 text-zinc-400 dark:text-zinc-600"/>}
            <input
                {...props}
                className={twMerge(`w-full ${IconLeft ? 'px-10' : 'px-4' }  py-2 border border-zinc-400 rounded focus:outline-none focus:border-violet-500 dark:border-zinc-700 dark:focus:border-violet-500`, props.className)}
            />
            {IconRight && <IconRight className="absolute right-2 top-2 text-zinc-400 dark:text-zinc-600"/>}
        </div>
    );
};
