import { useState, useRef } from "react";
import ReactDOM from "react-dom";

const DropdownModal = ({
  title,
  onClose,
  selectedItem,
  search,
  onChange,
  items,
}: {
  title: string;
  onClose: () => void;
  search: string;
  selectedItem: string;
  items: Array<{
    title: string;
    value: string;
  }>;
  onChange: (value: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = useRef<HTMLDivElement | null>(null); // Ref for modal

  const excludedCurrentItem = items.filter((item) => item.value !== selectedItem);
  const filteredItems = excludedCurrentItem.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside the modal to close it
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Close the modal
    }
  };

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={handleOutsideClick} // Listen for clicks on the overlay
    >
      <div
        ref={modalRef} // Attach ref to modal container
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          width: "400px",
          maxHeight: "80%",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "18px", margin: 0, color: "black" }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              color: "black",
            }}
          >
            ✖
          </button>
        </div>
        <input
          type="text"
          placeholder={`Search for a ${search}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "white",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  onChange(item.value);
                  onClose();
                }}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: "#f9f9f9",
                  marginBottom: "5px",
                  borderRadius: "5px",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e6e6e6")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
              >
                {item.title}
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#999" }}>No items found</p>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default DropdownModal;