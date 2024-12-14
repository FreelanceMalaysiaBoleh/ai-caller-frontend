import AiNameAndRole from "@/components/ai-assistant/nodes/design/AiNameAndRole";
import Initiate from "@/components/ai-assistant/nodes/design/Initiate";

export const ItemTypes = {
    NODE: 'node'
}

const initiateKey = "Initiate"
const aiNameAndRoleKey = "AI Name & Role"

export const NodeType = {
    initiate: initiateKey,
    aiNameAndRole: aiNameAndRoleKey
}

export const NodeTypes = { 
    [NodeType.initiate]: Initiate,
    [NodeType.aiNameAndRole]: AiNameAndRole,
};