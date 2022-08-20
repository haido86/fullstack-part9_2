const DisplayError = ({ errorMessage }: { errorMessage: string | undefined }) => {
    if (errorMessage === undefined || errorMessage === null) { return null; }

    else {
        return (
            <div>{errorMessage}</div>
        );
    }
};

export default DisplayError;