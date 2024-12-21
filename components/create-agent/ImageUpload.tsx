import React, { useState, ChangeEvent } from "react";
import AvatarDefault from "../../public/images/avatar_default.png";

const ImageUpload: React.FC = () => {
    const [avatar, setAvatar] = useState<string>(AvatarDefault.src);
    const [fileName, setFileName] = useState<string>("accepted formats png, jpg");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0]; // Safely access the first file

        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                setFileName(file.name);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid PNG or JPG file.");
        }
    };

    return (
        <div
            style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            {/* Avatar */}
            <div
                style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#3e3e3e",
                    marginRight: "20px",
                }}
            >
                <img
                    src={avatar}
                    alt="Avatar"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>

            {/* File Input Button */}
            <label
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "solid 1px",
                    borderColor: "#626262",
                    backgroundColor: "#363636",
                    borderRadius: "7px",
                    height: "42px",
                    padding: 10,
                    width: "175px",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                Choose File
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </label>

            {/* Display File Name */}
            <p id="small" style={{ marginLeft: "20px" }}>
                {fileName}
            </p>
        </div>
    );
};

export default ImageUpload;