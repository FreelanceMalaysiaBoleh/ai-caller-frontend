import type { MenuProps } from 'antd';
import { Dropdown } from "antd";
import { CgAdd } from 'react-icons/cg';

interface AddNewButtonProps {
    addNewNode: () => void,
    addNewIf: () => void,
}

const AddNewButton = ({
    addNewNode,
    addNewIf
}: AddNewButtonProps) => {

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <p onClick={() => {
                    addNewNode()
                }}>
                    Add node
                </p>
            ),
        },
        {
            key: '2',
            label: (
                <p onClick={() => {
                    addNewIf()
                }}>
                    Add IF condition
                </p>
            ),
        }
    ];

    return (
        <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
                <CgAdd size={40} />
            </Dropdown>
        </div>
    )
}

export default AddNewButton;