import { IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { ReactNode, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSolidRightArrow } from "react-icons/bi";
import AddConnectionModal from "./AddConnectionModal";
import AddCollectionModal from "./AddCollectionModal";

const sampleData = [
  {
    bv_name: "Coca Cola",
    bv_size: "Large",
    bv_date: "06-01-2025",
    bv_time: "08:03:30 UTC",
    bv_id: "1dsfg41sds",
    bv_orders: "201 ordered",
  },
  {
    bv_name: "Pepsi",
    bv_size: "Medium",
    bv_date: "07-01-2025",
    bv_time: "09:15:00 UTC",
    bv_id: "dasdf121d",
    bv_orders: "105 ordered",
  },
  {
    bv_name: "Sprite",
    bv_size: "Small",
    bv_date: "08-01-2025",
    bv_time: "11:45:00 UTC",
    bv_id: "qwerty098",
    bv_orders: "320 ordered",
  },
  {
    bv_name: "Fanta",
    bv_size: "Large",
    bv_date: "09-01-2025",
    bv_time: "14:30:00 UTC",
    bv_id: "asdfgh567",
    bv_orders: "85 ordered",
  },
];

const DatabaseDataListing = () => {

  const [openConnection, setOpenConnection] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);
  return (
    <>
      <AddConnectionModal open={openConnection} setOpen={setOpenConnection} />
      <AddCollectionModal open={openCollection} setOpen={setOpenCollection}/>

      <div style={{ display: "flex", flexDirection: "row", padding: "10px 10px" }}>
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "row", }}>
          <IoIosArrowForward size={25} color="white" />
          <p style={{ fontSize: "18px" }}>beverages</p>
        </div>

        <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
          <IconButton
            text="ADD DATA"
            icon={<FaPlus size={10} color="white" style={{ marginRight: "10px" }} />}
            onClick={()=>{
              setOpenConnection(true)
            }}
          />
          <div style={{ marginLeft: "10px" }}></div>
          <IconButton
            text="UPDATE"
            icon={<AiOutlineEdit size={15} color="white" style={{ marginRight: "10px" }} />}
            onClick={()=>{
              setOpenCollection(true)
            }}
          />
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
        {sampleData.map((data, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 calc(50% - 20px)", // Two cards per row with 20px gap
              boxSizing: "border-box",
            }}
          >
            <DataCard data={data} />
          </div>
        ))}
      </div>
    </>
  )
}


export default DatabaseDataListing;

const IconButton = ({ icon, text, onClick }: { icon: ReactNode, text: string, onClick: () => void }) => {

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
    onClick={onClick}
    >
      {icon}
      {text}
    </div>
  )
}

type DataCardProps = {
  data: Record<string, string>;
};

const DataCard: React.FC<DataCardProps> = ({ data }) => {
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
      <div
        style={{
          border: "1px solid white",
          marginLeft: "auto",
          height: "20px",
          borderRadius: "2px",
          padding: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BiSolidRightArrow size={10} color="white" />
      </div>
    </div>
  );
};