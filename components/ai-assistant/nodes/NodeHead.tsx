import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import NodeHeadModal from "./NodeHeadModal";
import { useReactFlow } from "reactflow";

interface NodeHeadProps {
  id: string;
  title: string;
  nodeType: string;
  color: string;
}

const NodeHead = ({ id, title, nodeType, color }: NodeHeadProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { setNodes } = useReactFlow();

  // Ref to detect click outside the dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const changeType = (newType: string) => {
    // Update the node's type using the setNodes function
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, type: newType } : node
      )
    );
  };

  const deleteNode = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id)); // Filter out the node with the given id
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const openModal = () => {
    setShowModal(true);
    setShowDropdown(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        backgroundColor: color,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        display: "flex",
        position: "relative", // Ensure dropdown is positioned relative to this container
      }}
    >
      <p style={{ fontSize: "14px", color: "white" }}>{title}</p>
      <div
        style={{ marginLeft: "auto", cursor: "pointer" }}
        onClick={toggleDropdown}
      >
        <BsThreeDotsVertical color="white" size={20} />
      </div>
      {showDropdown && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px 15px",
              cursor: "pointer",
              fontSize: "14px",
              color: "red",
              borderBottom: "1px solid #ddd",
            }}
            onClick={deleteNode}
          >
            Delete
          </div>
          <div
            style={{
              padding: "10px 15px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#333333",
            }}
            onClick={openModal}
          >
            Change Node
          </div>
        </div>
      )}
      {showModal && <NodeHeadModal onClose={closeModal} currentNodeType={nodeType} changeType={changeType} />}
    </div>
  );
};

export default NodeHead;