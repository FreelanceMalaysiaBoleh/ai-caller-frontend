import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeDropdown from '../../NodeDropdown';
import { useDrag } from 'react-dnd';
import { ItemTypes, NodeType } from '@/contants/NodeConstants';
import { LegacyRef } from 'react';

const typeOptions = [
  { value: 'MySQL', label: 'MySQL' },
  { value: 'MongoDb', label: 'MongoDb' },
  { value: 'PostgresDb', label: 'PostgresDb' },
];

//key: .dbConnection
const DBConnectionDrag = () => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.NODE,
    item: { type: NodeType.dbConnection },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  return (
    <div
      ref={(drag as unknown) as LegacyRef<HTMLDivElement>}
      style={{
        borderRadius: '10px',
        paddingBottom: "15px",
        backgroundColor: '#5B5B5B',
        boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        cursor: "grab"
      }}
    >

      <div style={{
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        backgroundColor: isDragging ? "#B30003" : "#7C0002",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
      }}>
        <p style={{ fontSize: "14px" }}>DB Connection</p>
      </div>
      {/* Editable Label */}
      <div style={{
        paddingTop: 10,
        paddingLeft: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
      }}>
        <TargetConnector isConnected={false} />
        <div style={{ marginRight: "auto", marginLeft: 5, width: "90%" }}>
          <div style={{ width: "100%", marginBottom: '10px' }}>
            <NodeDropdown
              placeholder="Select Database Type"
              options={typeOptions}
              onSelect={() => { }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={""}
              disabled
              placeholder='db name'
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#2B2B2B',
                color: "white"
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              value={""}
              placeholder='db passwrd'
              disabled
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#2B2B2B',
                color: "white"
              }}
            />
          </div>

          <div>
            <input
              type="text"
              value={""}
              placeholder='db url'
              disabled
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#2B2B2B',
                color: "white"
              }}
            />
          </div>
        </div>

        <SourceConnector isConnected={false} />
      </div>
    </div>
  );
};

export default DBConnectionDrag;