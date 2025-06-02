import { ClipLoader } from "react-spinners";

const Spinner = ({
    message = "Loading...",
}: {
    message?: string;
}) => {
    return <>
        <div className="fixed inset-0 bg-gray-300/40 transition-opacity z-60" aria-hidden="true"></div>
        <div className="flex justify-center items-center gap-2 fixed inset-0 z-70 w-screen overflow-y-auto">
            <ClipLoader
                // size={size}
                color={"var(--primary)"}
                loading={true}
            />
            <span className='message'>
                {message}...
            </span>
        </div>
    </>
}

export default Spinner