import { BsCaretRightFill } from "react-icons/bs";
import { BsCaretRight } from "react-icons/bs";

const SourceConnector = ({ isConnected }: { isConnected: boolean }) => {

    return (
        <>
            {
                isConnected
                    ?
                    <BsCaretRightFill size={22} color="white" />
                    :
                    <BsCaretRight size={22} color="white" />
            }
        </>
    )
}

export default SourceConnector;