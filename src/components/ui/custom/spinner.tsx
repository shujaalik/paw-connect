import { Spinner } from "../spinner";

const FullScreenSpinner = ({
    message = "Loading...",
}: {
    message?: string;
}) => {
    return <div
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-popover/50">
        <Spinner size="large">
            {message}...
        </Spinner>
    </div>
}

export default FullScreenSpinner