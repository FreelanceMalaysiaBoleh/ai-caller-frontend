import { IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { ReactNode, useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { ItemsArray } from "@/hooks/data-management/useCollectionItems";
import AddItemModal from "./AddItemModal";
import { FaTrash } from "react-icons/fa";
import { deleteItem } from "@/services/DatabaseServices";
import { useGetToken } from "@/services/AuthServices";

function convertToRecord(obj: unknown): Record<string, string> {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    throw new Error("Input must be a non-null object");
  }

  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    result[key] = String(value); // Convert all values to strings
  }

  return result;
}

const DatabaseDataListing = ({ title, data, databaseId, collectionName, refreshData }: {
  title: string,
  data: ItemsArray,
  databaseId: string | null,
  collectionName: string | null,
  refreshData: () => void
}) => {

  const [openAddItem, setOpenAddItem] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, unknown>>();
  const dataObjects = data.items;
  const token = useGetToken();

  return (
    <>
      <AddItemModal
        item={editItem}
        databaseId={databaseId}
        collectionName={collectionName}
        open={openAddItem}
        setOpen={setOpenAddItem}
        refreshData={refreshData}
      />
      <div style={{ display: "flex", flexDirection: "row", padding: "10px 10px" }}>
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "row", }}>
          {
            title
              ?
              <>
                <IoIosArrowForward size={25} color="white" />
                <p style={{ fontSize: "18px" }}>{title}</p>
              </>
              :
              <></>
          }
        </div>

        <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
          <IconButton
            text="ADD DATA"
            disabled={collectionName ? false : true}
            icon={<FaPlus size={10} color="white" style={{ marginRight: "10px" }} />}
            onClick={() => {
              setEditItem(undefined);
              setOpenAddItem(true);
            }}
          />
          {/* <div style={{ marginLeft: "10px" }}></div>
          <IconButton
            text="UPDATE"
            icon={<AiOutlineEdit size={15} color="white" style={{ marginRight: "10px" }} />}
            onClick={() => {

            }}
          /> */}
        </div>

        <input
          type="text"
          placeholder="{ field: ‘value’ }"
          style={{
            height: "36px",
            padding: "8px",
            border: "1px solid #646464",
            borderRadius: "5px",
            backgroundColor: "#262626",
            width: "30%",
            color: "white",
          }}
        />
      </div>


      <div style={{ width: "100%", borderBottom: "1px solid #909090" }}></div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {
          dataObjects && dataObjects.map((data, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 calc(50% - 20px)", // Two cards per row with 20px gap
                boxSizing: "border-box",
              }}
            >
              <DataCard
                dbId={databaseId || ""}
                refreshData={refreshData}
                collectioName={collectionName || ""}
                data={convertToRecord(data)}
                token={token}
                onClick={() => {
                  setEditItem(data as Record<string, unknown>);
                  setOpenAddItem(true);
                }} />
            </div>
          ))}
      </div>
    </>
  )
}


export default DatabaseDataListing;

const IconButton = ({
  icon,
  text,
  disabled = false,
  onClick
}: {
  icon: ReactNode,
  text: string,
  disabled?: boolean,
  onClick: () => void
}) => {

  return (
    <div style={{
      backgroundColor: "#363636",
      color: "#CDCDCD",
      border: "1px solid #626262",
      padding: "5px 30px 5px",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }}
      onClick={disabled ? () => { } : onClick}
    >
      {icon}
      {text}
    </div>
  )
}

type DataCardProps = {
  data: Record<string, string>;
  onClick: () => void;
  dbId: string;
  collectioName: string;
  token: string | null;
  refreshData: () => void
};

const DataCard: React.FC<DataCardProps> = ({
  data,
  onClick,
  dbId,
  collectioName,
  token,
  refreshData
}) => {

  const handleDelete = async () => {
    const results = await deleteItem(dbId, collectioName, data._id, token);

    if (results.success) {
      window.alert("Item deleted succesfully");
      refreshData();
      return
    }

    window.alert(results.error || "Error deleting Item");
  }
  return (
    <div
      style={{
        backgroundColor: "#323232",
        color: "white",
        border: "1px solid #6D6D6D",
        borderRadius: "5px",
        padding: "15px",
        fontFamily: "monospace",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
      }}
    >
      <div>
        {Object.entries(data).map(([key, value]) => (
          <p key={key} style={{ margin: "5px 0" }}>
            <span style={{ color: "white" }}>{key}</span> :{" "}
            <span style={{ color: "green" }}>{value}</span>
          </p>
        ))}
      </div>
      <div style={{
        marginLeft: "auto",
      }}>
        <div
          style={{
            border: "1px solid white",
            height: "20px",
            borderRadius: "2px",
            padding: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClick}
        >
          <BiSolidRightArrow size={10} color="white" />
        </div>
        <FaTrash style={{ marginTop: "10px" }} size={20} color="white" onClick={() => {
          handleDelete();
        }} />
      </div>
    </div>
  );
};