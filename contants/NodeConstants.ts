import AiNameAndRole from "@/components/ai-assistant/nodes/design/AiNameAndRole";
import Boundaries from "@/components/ai-assistant/nodes/design/Boundaries";
import CustomerSpeech from "@/components/ai-assistant/nodes/design/CustomerSpeech";
import Initiate from "@/components/ai-assistant/nodes/design/Initiate";
import WelcomingMessage from "@/components/ai-assistant/nodes/design/WelcomingMessage";


export const ItemTypes = {
    NODE: 'node'
}

//1. setup a key for the node, this will be used by ReactFlow to identify the type of node
const initiateKey = "Initiate"
const aiNameAndRoleKey = "AI Name & Role"
const welcomingMessage = "Welcoming Message"
const customerSpeech = "Customer Speech"
const boundaries = "Boundaries"

//2. add it into the constant for easy query
export const NodeType = {
    initiate: initiateKey,
    aiNameAndRole: aiNameAndRoleKey,
    welcomingMessage: welcomingMessage,
    customerSpeech: customerSpeech,
    boundaries: boundaries,
}

//3. register the new node for ReactFlow, import the component from "design"
export const NodeTypes = { 
    [NodeType.initiate]: Initiate,
    [NodeType.aiNameAndRole]: AiNameAndRole,
    [NodeType.welcomingMessage]: WelcomingMessage,
    [NodeType.customerSpeech]: CustomerSpeech,
    [NodeType.boundaries]: Boundaries,
};