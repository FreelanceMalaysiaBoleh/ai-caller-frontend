import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
Background,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
  ReactFlowInstance, // Import the correct type
} from 'reactflow';
import { useDrop } from 'react-dnd';
import { ItemTypes, NodeProps } from './Node';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 0 },
  },
];

const initialEdges: Edge[] = [];

const Canvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);


  const onInit = (instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;

    instance.setViewport({ x: 100, y: 100, zoom: 1 });
  };

  const onConnect = useCallback(
    (params: Connection) => {
      console.log("Connecting edges:", params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.NODE,
    drop: (item: NodeProps, monitor) => {
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
        id: `${nodes.length + 1}`,
        type: 'default',
        data: { label: item.desc },
        position,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [nodes, reactFlowInstance]);

  console.log("nodes:", nodes);
  console.log("edges:", edges);

  return (
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
      >
        {/* <Controls /> */}
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Canvas;