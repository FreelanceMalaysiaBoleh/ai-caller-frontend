import MainLayout from "@/components/general/MainLayout";
import ProfileDetails from "@/components/profile/ProfileDetails";
import TelephonySettings from "@/components/profile/TelephonySettings";
import { useRouter } from "next/router";

const ProfileDetail = () => {

  const router = useRouter();
  const { userId } = router.query;

  console.log(userId);

  return (
    <MainLayout>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", gap: "20px" }}>
        <div style={{ width: "40%", height: "75%", maxHeight: "600px" }}>
          <ProfileDetails />
        </div>
        <div style={{ width: "55%", height: "70%" }}>
          <TelephonySettings />
        </div>
      </div>
    </MainLayout >
  );
}

export default ProfileDetail;
