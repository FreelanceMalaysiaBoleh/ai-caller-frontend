import {  useState } from "react";
import PhoneCall from "../../public/images/phonecall.png"
import AddNewButton from "./AddNewButton";
import AddNodeDropBox from "./AddNodeDropBox";
import IfBranch from "./IfBranch";
import FilledNode from "./FilledNode";
import IfConnector from "./IfConnector";
import { getNodeDetails } from "@/contants/getNodesDetails";

export interface NodeState {
    id: string,
    type: "add new" | "add node" | "filled" | "if" | "connector",

    //Only applicable to if branch
    condition?: string,
    true?: NodeState[],
    false?: NodeState[]

    //Only applicable to filled nodes,
    desc?: string,
    color?: string,
    imgSrc?: string,
    imgWidth?: number,
}



const Board = () => {
    //id and their meaning
    //0, need to add node
    // const [tree, setTree] = useState<NodeState[]>(testTree);
    const [tree, setTree] = useState<NodeState[]>([{
        id: "-2",
        type: "add new"
    }]);


    const findAndModifyNode = (
        nodes: NodeState[],
        targetId: string,
        modifyCallback: (node: NodeState) => void,
        withinIfBranch: boolean,
        isTrueFalse: boolean,
    ): NodeState[] => {
        let foundInIfBranch = false;

        // Map through nodes to apply modifications
        const updatedNodes = nodes.map((node) => {
            if (node.id === targetId) {
                const updatedNode = { ...node };
                console.log("check true false", withinIfBranch);

                if (withinIfBranch) {
                    foundInIfBranch = true;  // Mark that we need to add a new node
                }

                modifyCallback(updatedNode);
                return updatedNode;
            }

            const updatedNode: NodeState = { ...node };

            // Recursively modify `true` and `false` branches if they exist
            if (node.true) {
                updatedNode.true = findAndModifyNode(node.true, targetId, modifyCallback, true, true);
            }
            if (node.false) {
                updatedNode.false = findAndModifyNode(node.false, targetId, modifyCallback, true, false);
            }

            return updatedNode;
        });

        // Add a new node at the end of the array if `withinIfBranch` is true
        if (foundInIfBranch) {
            updatedNodes.push({
                id: `${isTrueFalse ? "T" : "F"}${targetId[1]}${Number(targetId.slice(2)) + 1}`,
                type: "add node"
            });
        }

        return updatedNodes;
    };

    const fillNode = (id: string, itemId: string, tree: NodeState[]) => {
        const itemDetails = getNodeDetails(itemId);
        const updatedNodes = findAndModifyNode(tree, id, (node: NodeState) => {
            node.type = "filled";
            node.desc = itemDetails.desc
            node.color = itemDetails.color
            node.imgSrc = itemDetails.imgSrc
            node.imgWidth = itemDetails.imgWidth
        }, false, false)

        setTree(updatedNodes);
    }

    const updateCondition = (text: string, id: string, tree: NodeState[]) => {
        const updatedNodes = findAndModifyNode(tree, id, (node: NodeState) => {
            node.condition = text
        }, false, false)

        setTree(updatedNodes);
    }


    const generateTree = (treeObj: NodeState[]): JSX.Element[] => {
        const createNode = (item: NodeState, isIf: 0 | 1 | 2, index: number, treeObj2: NodeState[]) => {

            if (item.type == "add new") {
                return <></>
            } else if (item.type == "add node") {
                let element = <></>

                if (isIf == 0) {
                    element = <AddNodeDropBox id={`${item.id}`} fillNode={fillNode} tree={treeObj2} />
                } else if (isIf == 1) {
                    element = <AddNodeDropBox id={`${item.id}`} fillNode={fillNode} tree={treeObj2} />
                } else {
                    element = <AddNodeDropBox id={`${item.id}`} fillNode={fillNode} tree={treeObj2} />
                }

                return element
            } else {
                return <FilledNode desc={item.desc || ""} color={item.color} imgsrc={item.imgSrc} imgWidth={item.imgWidth} />
            }
        }

        return treeObj.map((item, index) => {
            const truePath: JSX.Element[] = []
            const falsePath: JSX.Element[] = []

            if (item.type == "if") {
                item.true!.map((node) => {
                    truePath.push(createNode(node, 1, index, treeObj))
                })
                item.false!.map((node) => {
                    falsePath.push(createNode(node, 2, index, treeObj))
                })

                return <IfBranch
                    key={`${index}1`}
                    truePath={truePath}
                    falsePath={falsePath}
                    condition={item.condition}
                    onConditionChange={(text) => updateCondition(text, item.id, treeObj)}
                />

            } else if (item.type == "connector") {
                return <IfConnector key={`${index}2`} />
            } else {
                return createNode(item, 0, index, treeObj)
            }


        })
    }

    const addNewNode = () => {
        const oldTree = [...tree]

        if (!!oldTree[oldTree.length - 1] && oldTree[oldTree.length - 1].type == "if") {
            oldTree.push({
                id: "0",
                type: "connector"
            })
        }
        oldTree.push({
            id: `${tree.length}`,
            type: "add node"
        })

        setTree(oldTree)
    }

    const addNewIf = () => {
        const oldTree = [...tree]

        if (!!oldTree[oldTree.length - 1] && oldTree[oldTree.length - 1].type == "if") {
            oldTree.push({
                id: "-2",
                type: "connector"
            })
        }

        oldTree.push({
            id: `IF${tree.length}`,
            type: "if",
            true: [{
                id: `T${tree.length}0`,
                type: "add node"
            }],
            false: [{
                id: `F${tree.length}0`,
                type: "add node"
            }]
        })

        setTree(oldTree)
    }



    return (
        <div style={{
            overflowY: "scroll",
            width: "100%",
            height: "100%"
        }}>
            <div style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "50px",
            }} >
                {/* <button style={{
                backgroundColor: "#849249",
                border: "none",
                borderRadius: 5,
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: "25px"
            }} onClick={() => {
                console.log(tree);
            }}><b>Save</b></button> */}
                <div style={{
                    cursor: "default",
                    marginTop: 20,
                    borderRadius: 20,
                    backgroundColor: "white",
                    color: "black",
                    padding: 10,
                    paddingBottom: 20,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <p style={{ marginBottom: "10px", color: "black" }}><b>Call Received</b></p>
                    <img width={60} height={60} src={PhoneCall.src}></img>
                </div>

                {
                    generateTree(tree).map(element => element)
                }

                {
                    tree[tree.length - 1].type == "add node"
                        ?
                        <></>
                        :
                        <AddNewButton addNewNode={addNewNode} addNewIf={addNewIf} />
                }

            </div>
        </div>
    )
}

export default Board;