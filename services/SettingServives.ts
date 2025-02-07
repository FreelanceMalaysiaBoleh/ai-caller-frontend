import axios, { AxiosError } from "axios";
import { getToken } from "./AuthServices";
import { ProfileDetailsFormType } from "@/hooks/profile/useProfileForm";

export const createUserSettings = async (values: ProfileDetailsFormType): Promise<{ success: boolean; data?: any; error?: string }> => {
    const token = getToken();

    try {
        const response = await axios({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/settings`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: values
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (err: unknown) {
        const error = err as AxiosError;

        return {
            success: false,
            error: error.message || "An unknown error occurred.",
        };
    }
}

export const updateUserSettings = async (values: ProfileDetailsFormType): Promise<{ success: boolean; data?: any; error?: string }> => {
    const token = getToken();

    delete values.user_id;
    delete values.created_at;
    delete values.updated_at;
    delete (values as { _id?: string })._id;

    try {
        const response = await axios({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/settings`,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: values
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.log(err);
        return {
            success: false,
            error: error.message || "An unknown error occurred.",
        };
    }
}

export const getUserSettings = async () => {

    const token = getToken();

    try {
        const response = await axios({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/settings`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (err: unknown) {
        const error = err as AxiosError;

        return {
            success: false,
            error: error.message || "An unknown error occurred.",
        };
    }
}