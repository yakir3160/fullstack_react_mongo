


export const Card = ({ children, className }) => {
    return (
        <div className={`border-2 border-red-200 rounded-md max-w-full p-6 text-black ${className}`}>
            {children}
        </div>
    );
}
