export const GridItem = ({children} : any) => {
    return (
        <>
            <div className="grid-item">
                <div className="grid-item-content block w-full">
                    {children}
                </div>
            </div>
        </>
    );
};
