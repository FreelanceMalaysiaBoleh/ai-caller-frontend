import OpenAiIcon from "@/public/images/open-ai-icon.png"
import MetaAiIcon from "@/public/images/meta-icon.png"
import MySQLIcon from "@/public/images/Mysql_logo.png"
import WeaviateIcon from "@/public/images/weaviate-logo.png"


export const getNodeDetails = (itemId: string): {
    desc: string,
    color: string,
    imgSrc?: string,
    imgWidth?: number,
} => {
    switch (itemId) {
        case "openai":
            return {
                desc: "Accept prompt using AI",
                color: "green",
                imgSrc: OpenAiIcon.src
            };
        case "metaai":
            return {
                desc: "Accept prompt using AI",
                color: "blue",
                imgSrc: MetaAiIcon.src,
                imgWidth: 100
            }
        case "getcustomer":
            return {
                desc: "Get customer data from database",
                color: "#c23beb"
            }
        case "updateticket":
            return {
                desc: "Update ticket",
                color: "brown"
            }
        case "storedbsql":
            return {
                desc: "Store into database",
                color: "#5184d6",
                imgWidth: 100,
                imgSrc: MySQLIcon.src
            }
        case "storedbweave":
            return {
                desc: "Store into database",
                color: "#1d994f",
                imgSrc: WeaviateIcon.src
            }
        case "add prompt":
            return {
                desc: "Add prompt",
                color: "#bd1756"
            }
    }

    return {
        desc: "blank",
        color: "black"
    }
}