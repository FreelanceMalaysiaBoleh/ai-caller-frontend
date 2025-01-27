import React, { useState, ChangeEvent } from "react";
import AvatarDefault from "../../public/images/avatar_default.png";

interface ImageUploadType {
    styleType?: 1 | 2,
    customLabel?: string,
    acceptedFormats?: Array<string>,
    setFile: (file: File) => void
}

const ImageUpload = ({
    styleType = 1,
    customLabel = "accepted formats png, jpg",
    acceptedFormats = ["image/jpeg", "image/png"],
    setFile
}: ImageUploadType) => {
    const [avatar, setAvatar] = useState<string>(AvatarDefault.src);
    const [fileName, setFileName] = useState<string>(customLabel);

    const formatChecker = (format: string, formats: Array<string>) => {
        return formats.includes(format);
    }

    const acceptedFormatString = acceptedFormats.join(", ")

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0]; // Safely access the first file

        if (file && formatChecker(file.type, acceptedFormats)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                setFileName(file.name);
                setFile(file);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid PNG or JPG file.");
        }
    };

    return (
        <div>
            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {/* Avatar */}
                {
                    styleType == 1 &&
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
                }


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
                        accept={acceptedFormatString}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </label>

                {/* Display File Name */}
                <p id="small" style={{ marginLeft: "20px", color: styleType == 1 ? "white" : "#C9C9C9" }}>
                    {fileName}
                </p>
            </div>
            <p id="small" style={{ marginTop: 12, color: "#C9C9C9" }}>
                Accepted formats pdf, csv, txt, json
            </p>
        </div>
    );
};

export default ImageUpload;