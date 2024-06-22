import {ReactNode} from "react";

interface NotificationActionsProps {
    children?: ReactNode;
}

export const NotificationActions = ({children}: NotificationActionsProps) => {
    return (
        <div className="flex gap-2 self-center">
            {children}
        </div>
    );
};
