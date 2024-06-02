interface IButtonProps {
    text: string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}
export const Button = ({ text, className, disabled, onClick, ...props }: IButtonProps) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`bg-green-500 text-white rounded p-2 cursor-ponter ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
