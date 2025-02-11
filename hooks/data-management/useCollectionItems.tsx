import { useState, useEffect } from "react";
import { getAllItemsInCollection } from "@/services/DatabaseServices";
import { useGetToken } from "@/services/AuthServices";

export interface ItemsArray<T = unknown> {
    items: T[];
}

export const useCollectionItems = (dbid: string, collectionName: string) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [collectionItems, setCollectionItems] = useState<ItemsArray | undefined>(undefined);
    const [refresh, setRefresh] = useState(false);
    const token = useGetToken();

    const refreshData = () => {
        setRefresh(refresh => !refresh);
      }

    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);
            try {
                console.log(dbid, collectionName);

                const response = await getAllItemsInCollection(dbid, collectionName, token);
                setCollectionItems(response.data);
            } catch (error) {
                console.log("errored man:")
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();

    }, [dbid, collectionName, token, refresh]);

    return { collectionItems, isLoading, refreshData };
};