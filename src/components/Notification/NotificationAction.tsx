import {ButtonHTMLAttributes, ElementType} from "react";
import { twMerge } from 'tailwind-merge'
interface NotificationActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ElementType;
}
export const NotificationAction = ({ icon: Icon, ...props}: NotificationActionProps) => {
    return (
        <button
            {...props}
            className={twMerge("w-8 h-8 rounded flex items-center justify-center bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-700 dark:hover:bg-zinc-600", props.className)}>
            <Icon className="w-3 h-3 text-zinc-50"/>
        </button>
    );
};
