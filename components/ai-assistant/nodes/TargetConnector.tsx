import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

const TargetConnector = ({ isConnected }: { isConnected: boolean }) => {

    return (
        <div style={{marginTop: 4}}>
            {
                isConnected
                    ?
                    <FaCircle size={15} color="white" />
                    :
                    <FaRegCircle size={15} color="white" />
            }
        </div>
    )
}

export default TargetConnector;