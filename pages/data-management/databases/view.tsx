import MainLayout from "@/components/general/MainLayout";
import { useRouter } from "next/router";
import { FaFolderOpen } from "react-icons/fa";
import DatabaseNavSideBar from "@/components/data-management/DatabaseNavSideBar";
import DatabaseDataListing from "@/components/data-management/DatabaseDataListing";
import { useDatabaseConnections } from "@/hooks/data-management/useDatabaseConnections";
import { useCollectionItems } from "@/hooks/data-management/useCollectionItems";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";


export default function DataManagementDetail() {

  const router = useRouter();
  const size = useScreenSize();
  const { dbId, collection_name } = router.query;

  const { connections, refreshData } = useDatabaseConnections();
  const { collectionItems, refreshData: refreshCollection } = useCollectionItems(dbId as string | undefined || "", collection_name as string | undefined || "");

  const databaseName = "GedeekDB"

  const headerLayout: "column" | "row" = responsiveValue(size, "column", "column", "row") as "column" | "row"
  
  return (
    <MainLayout>
      <div style={{ height: "100%", paddingTop: "20px", display: "flex", flexDirection: headerLayout }}>
        <div style={{ width: size == "large" ? "85%" : "100%" }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
            <FaFolderOpen size={50} color="#9d9d9d" />
            <div style={{ marginLeft: "10px" }}>
              <h1 style={{
                color: "#B5B5B5",
                fontWeight: "normal",
                fontSize: responsiveValue(size, 14, 18, 24) as number,
              }} >AI DATA CENTER - <span style={{ color: "white" }}>{databaseName}</span></h1>
              <p style={{
                color: "#B5B5B5",
                fontSize: responsiveValue(size, 10, 14, 18) as number,
              }}>Here you can view and add new data</p>
            </div>
            {
              size == "small"
                ?
                <></>
                :
                <div style={{ height: "50px", marginLeft: 10, marginRight: 10, borderLeft: "2px solid #909090" }}></div>
            }            <div style={{ marginLeft: "10px" }}>
              <h1 style={{
                color: "#B5B5B5",
                fontWeight: "normal",
                fontSize: responsiveValue(size, 14, 18, 24) as number,
              }} >21.6k Data</h1>
              <p style={{
                color: "#B5B5B5",
                fontSize: responsiveValue(size, 8, 10, 12) as number,
              }}>Syncing with gedeek cloud...</p>
            </div>
          </div>


          <div style={{ marginBottom: "10px" }}></div>
          <div style={{
            backgroundColor: "#3E3E3E",
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}>

            <div style={{ borderRight: "1px solid #909090", height: "100%", width: "30%", paddingTop: "10px" }}>
              <DatabaseNavSideBar data={connections} refreshData={refreshData} />
            </div>

            <div style={{ height: "100%", width: "70%" }}>
              <DatabaseDataListing
                databaseId={dbId as string | undefined || ""}
                collectionName={collection_name as string | undefined || ""}
                title={collection_name as string | undefined || ""}
                data={collectionItems || { items: [] }}
                refreshData={refreshCollection}
              />
            </div>
          </div>
        </div>

        {
          size == "small"
            ?
            <></>
            :
            <div style={{ marginLeft: size == "medium" ? 0 : "20px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{
                paddingTop: "10px"
              }}>
                <h2 style={{ fontSize: "24px", textAlign: "center" }}>Console Log</h2>
              </div>

              <div style={{
                height: size == "medium" ? "40%" : "90%",
                backgroundColor: "#3E3E3E",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
              </div>
            </div>
        }




      </div>

    </MainLayout >
  );
}

