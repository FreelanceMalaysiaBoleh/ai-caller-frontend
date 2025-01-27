import { useDrag } from "react-dnd";
import { ItemTypes, NodeItems } from "@/contants/NodeConstants";
import { LegacyRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

const NodeListItem = ({ nodeType }: { nodeType: string }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.NODE,
        item: { type: nodeType },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={(drag as unknown) as LegacyRef<HTMLDivElement>}
            style={{ backgroundColor: isDragging ? "#8C8C8C" : "#626262", padding: "10px 30px", borderRadius: "3px", marginBottom: "5px" }}
        >
            <p>{nodeType}</p>
        </div>
    )
}

const NodeBar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState(NodeItems);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = NodeItems.filter((item) =>
            item.title.toLowerCase().includes(query)
        );
        setFilteredItems(filtered);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: "column",
                height: '100vh',
                width: "20%",
                margin: 0,
                alignItems: "center",
                marginLeft: 20,
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Blueprints</h1>
            <div style={{ backgroundColor: "#3e3e3e", flex: 1, overflowY: "auto", width: "80%" }}>
                <div style={{ width: "100%", padding: "5px" }}>
                    <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
                </div>

                {filteredItems.map((Node) => (
                    <NodeListItem key={Node.title} nodeType={Node.value} />
                ))}
            </div>
        </div>
    )
}

export default NodeBar;

const SearchBar = ({ searchQuery, handleSearch }: { searchQuery: string, handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div style={styles.container}>
            <CiSearch style={styles.icon} />
            <input
                type="text"
                value={searchQuery}
                onChange={(handleSearch)}
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
        borderRadius: '8px',
        backgroundColor: '#333', // dark background
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
    },
};