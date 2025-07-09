import MainLayout from "@/components/general/MainLayout";
import ProfileDetails from "@/components/profile/ProfileDetails";
import TelephonySettings from "@/components/profile/TelephonySettings";
import { responsiveValue, useScreenSize} from "@/context/ViewportContext";

const ProfileDetail = () => {

  const size = useScreenSize();
  const layout: "row" | "column" = responsiveValue(size, "column", "column","row") as "row" | "column";

  return (
    <MainLayout>
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: layout,
        gap: "20px",
        paddingBottom: 20,
      }}>
        <div style={{ width: responsiveValue(size, "100%", "90%","40%") as string }}>
          <ProfileDetails />
        </div>
        <div style={{ width: responsiveValue(size, "100%", "100%","60%") as string}}>
          <TelephonySettings />
        </div>
      </div>
    </MainLayout >
  );
}

export default ProfileDetail;
