import AiNameAndRole from "@/components/ai-assistant/nodes/design/AiNameAndRole";
import APIExecutor from "@/components/ai-assistant/nodes/design/APIExecutor";
import Boundaries from "@/components/ai-assistant/nodes/design/Boundaries";
import CustomerSpeech from "@/components/ai-assistant/nodes/design/CustomerSpeech";
import DBConnection from "@/components/ai-assistant/nodes/design/DBConnection";
import DBReaderComponent from "@/components/ai-assistant/nodes/design/DBReader";
import DBWriterComponent from "@/components/ai-assistant/nodes/design/DBWriter";
import FunctionCall from "@/components/ai-assistant/nodes/design/FunctionCall";
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
const functionCall = "Function Call"
const dbReader = "DB Reader"
const dbWriter = "DB Writer"
const apiExecutor = "API Executor"
const dbConnection = "DB Connection"

//2. add it into the constant for easy query
export const NodeType = {
    initiate: initiateKey,
    aiNameAndRole: aiNameAndRoleKey,
    welcomingMessage: welcomingMessage,
    customerSpeech: customerSpeech,
    boundaries: boundaries,
    functionCall: functionCall,
    dbReader: dbReader,
    dbWriter: dbWriter,
    apiExecutor: apiExecutor,
    dbConnection: dbConnection,
}

//3. register the new node for ReactFlow, import the component from "design"
export const NodeTypes = { 
    [NodeType.initiate]: Initiate,
    [NodeType.aiNameAndRole]: AiNameAndRole,
    [NodeType.welcomingMessage]: WelcomingMessage,
    [NodeType.customerSpeech]: CustomerSpeech,
    [NodeType.boundaries]: Boundaries,
    [NodeType.functionCall]: FunctionCall,
    [NodeType.dbReader]: DBReaderComponent,
    [NodeType.dbWriter]: DBWriterComponent,
    [NodeType.apiExecutor]: APIExecutor,
    [NodeType.dbConnection]: DBConnection,
};