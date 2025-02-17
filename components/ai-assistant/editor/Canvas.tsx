import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  OnNodesChange,
  OnEdgesChange,
} from 'reactflow';
import { useDrop } from 'react-dnd';
import 'reactflow/dist/style.css';
import { ItemTypes, NodeType, NodeTypes } from '@/contants/NodeConstants';
import { WorkFlowType } from '@/hooks/workflow/useWorkflow';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: NodeType.initiate,
    data: {},
    position: { x: 250, y: 0 },
  },
];

export const initialEdges: Edge[] = [];

type CanvasProps = {
  workflow?: WorkFlowType
  isLoading: boolean
  nodes: Node[]
  edges: Edge[]
  setNodes: Dispatch<SetStateAction<Node[]>>
  setEdges: Dispatch<SetStateAction<Edge[]>>
  handleSaveWorkflow: () => void
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange

}

const Canvas = ({
  workflow,
  isLoading,
  nodes,
  edges,
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange
}: CanvasProps) => {

  // const [saveLock, setSaveLock] = useState(0);

  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const onInit = (instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;

    instance.setViewport({ x: 100, y: 100, zoom: 1 });
  };

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));

      const updatedNodes = nodes.map((node) => {
        if (node.id === params.target) {
          return {
            ...node,
            data: { ...node.data, isConnectedTarget: true },
          };

        }
        return node;
      });
      setNodes(updatedNodes); // Update the node states
    },
    [nodes, setEdges, setNodes]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.NODE,
    drop: (item: { type: string }, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset || !reactFlowInstance.current) return;

      // Get the bounding box of the ReactFlow container
      const canvasBounds = document
        .querySelector('.reactflow')!
        .getBoundingClientRect();

      // Map the mouse position to ReactFlow's coordinate system
      const position = {
        x: clientOffset.x - canvasBounds.left - 175,
        y: clientOffset.y - canvasBounds.top - 120,
      };

      const newNode: Node = {
        id: `${Number(nodes[nodes.length - 1].id) + 1}`,
        type: item.type,
        data: { label: "empty" },
        position,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [nodes, reactFlowInstance]);



  // useEffect(() => {
  //   console.log("save workflow", saveLock)
  //   if (nodes.length > 0 && nodes.length % 4 === 0 && saveLock != nodes.length) {
  //     handleSaveWorkflow();
  //     setSaveLock(nodes.length)
  //   }

  // }, [nodes]);

  useEffect(() => {
    if (workflow) {
      setNodes(workflow?.nodes)
      setEdges(workflow?.edges)
    }
  }, [workflow])

  if (isLoading) return <div>Loading</div>

  return (
    <>{
      <ReactFlowProvider>
        <div
          ref={(drop as unknown) as React.Ref<HTMLDivElement>}
          className="reactflow"
          style={{
            height: '100vh',
            border: isOver ? '2px dashed green' : '2px solid transparent',
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            zoomOnScroll={false} // Disable zoom with mouse scroll
            panOnScroll={false} // Disable panning with scroll
            onInit={onInit}
            nodeTypes={NodeTypes}
          >
            {/* <Controls /> */}
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>

    }
    </>

  );
};

export default Canvas;