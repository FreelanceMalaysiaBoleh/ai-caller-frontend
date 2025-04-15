import MainLayout from "@/components/general/MainLayout";
import { FaFolderOpen } from "react-icons/fa";
import { FaGoogleDrive } from "react-icons/fa";
import { GrOnedrive } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { RiFileAddFill } from "react-icons/ri";
import DataTable from "@/components/data-management/DataTable";
import AddFileModal from "@/components/data-management/AddFileModal";
import { useState } from "react";
import { useGetAllFiles } from "@/hooks/data-management/useGetAllFiles";
import { deleteFiles } from "@/services/FileServices";
import { useGetToken } from "@/services/AuthServices";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import MobileDataTable from "@/components/data-management/MobileDataTable";

export default function DataManagementDetail() {

  const { files, isLoading } = useGetAllFiles();
  const [checkedFiles, setCheckFiles] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const token = useGetToken();
  const size = useScreenSize();

  const toggleModal = () => {
    setOpen((val) => !val);
  }

  const handleDeleteFiles = async () => {
    const results = await deleteFiles(checkedFiles, token);

    if (results.success) {
      window.alert("Files deleted succesfully");
      window.location.reload();
      return
    }

    window.alert("");
  }

  const headerLayout: "column" | "row" = responsiveValue(size, "column", "column", "row") as "column" | "row"
  const headerAlign: "center" | "start" = responsiveValue(size, "start", "start", "center") as "center" | "start"

  const bodyLayout: "column" | "row" = responsiveValue(size, "column", "column", "row") as "column" | "row"

  return (
    <MainLayout>
      <div style={{ height: "100%", paddingTop: "20px", display: "flex", flexDirection: bodyLayout }}>
        <AddFileModal open={open} setOpen={setOpen} />
        <div style={{ width: size == "large" ? "85%" : "100%" }}>
          <div style={{
            display: "flex",
            flexDirection: headerLayout,
            alignItems: headerAlign,
          }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
              <FaFolderOpen size={size == "large" ? 50 : 30} color="#9d9d9d" />
              <div style={{ marginLeft: "10px" }}>
                <h1 style={{
                  color: "#B5B5B5",
                  fontWeight: "normal",
                  fontSize: responsiveValue(size, 14, 18, 24),
                }} >AI DATA CENTER - <span style={{ color: "white" }}>Documents</span></h1>
                <p style={{
                  color: "#B5B5B5",
                  fontSize: responsiveValue(size, 10, 14, 18),
                }}>Here you can view and add new data</p>
              </div>
              {
                size == "small"
                  ?
                  <></>
                  :
                  <div style={{ height: "50px", marginLeft: 10, marginRight: 10, borderLeft: "2px solid #909090" }}></div>
              }
              <div style={{ marginLeft: "10px" }}>
                <h1 style={{
                  color: "#B5B5B5",
                  fontWeight: "normal",
                  fontSize: responsiveValue(size, 16, 18, 24),
                }} >124 Records</h1>
                <p style={{
                  color: "#B5B5B5",
                  fontSize: size == "large" ? 12 : 10,
                }}>Syncing with gedeek cloud...</p>
              </div>
            </div>

            {
              size == "large"
                ?
                <div style={{
                  display: "flex",
                  marginTop: 0,
                  flexDirection: "row",
                  marginLeft: "auto",
                }}>
                  <div style={{ marginRight: "20px" }}>
                    <FaGoogleDrive style={{ marginRight: "10px" }} size={25} color="#9D9D9D" />
                    <GrOnedrive size={25} color="#9D9D9D" />
                  </div>


                  <SearchBar />
                  <FaTrash
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                    size={25}
                    color="#9D9D9D"
                    onClick={() => {
                      handleDeleteFiles();
                    }}
                  />
                  <div onClick={toggleModal} style={{ cursor: "pointer" }}>
                    <RiFileAddFill size={25} color="#9D9D9D" />
                  </div>
                </div>
                :
                <div style={{
                  display: "flex",
                  marginTop: 15,
                  flexDirection: "row",
                  width: "100%",
                }}>
                  <div>
                    <FaTrash
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                      size={25}
                      color="#9D9D9D"
                      onClick={() => {
                        handleDeleteFiles();
                      }}
                    />
                  </div>
                  <div onClick={toggleModal} style={{ cursor: "pointer", marginRight: 10 }}>
                    <RiFileAddFill size={25} color="#9D9D9D" />
                  </div>

                  <SearchBar />
                </div>
            }
          </div>


          <div style={{ marginBottom: "10px" }}></div>
          {
            size == "small"
              ?
              <div>
                {
                  !isLoading && files
                    ?
                    <MobileDataTable files={files} checkedFiles={checkedFiles} setCheckFiles={setCheckFiles} />
                    :
                    <h2>Loading files...</h2>
                }
              </div>
              :
              <div style={{
                backgroundColor: "#3E3E3E",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "30px"
              }}>

                <div style={{
                  width: "100%",
                  padding: "10px 15px"
                }}>

                  {
                    !isLoading && files
                      ?
                      <DataTable files={files} checkedFiles={checkedFiles} setCheckFiles={setCheckFiles} />
                      :
                      <h2>Loading files...</h2>
                  }
                </div>
              </div>
          }

        </div>

        {
          size == "small"
            ?
            <></>
            :
            <div style={{ marginLeft: size == "large" ? "20px" : "", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{
                paddingTop: "10px"
              }}>
                <h2 style={{ fontSize: "24px", textAlign: size == "large" ? "center" : "start" }}>Console Log</h2>
              </div>

              <div style={{
                height: size == "large" ? "90%" : "20%",
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

const SearchBar = () => {
  return (
    <div style={styles.container}>
      <CiSearch style={styles.icon} />
      <input
        type="text"
        placeholder="Search..."
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#333',
  },
  icon: {
    fontSize: '20px',
    color: '#fff',
    marginRight: '8px',
  },
  input: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '16px',
    flex: 1,
    width: "100%"
  },
};

