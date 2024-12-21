import SourceConnector from '../SourceConnector';
import TargetConnector from '../TargetConnector';
import NodeDropdown from '../../NodeDropdown';
import { useDrag } from 'react-dnd';
import { ItemTypes, NodeType } from '@/contants/NodeConstants';
import { LegacyRef } from 'react';

const options = [
  { value: 'str', label: 'string' },
  { value: 'num', label: 'number' },
  { value: 'bool', label: 'boolean' },
];

//key: .functionCall
const FunctionCallDrag = () => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.NODE,
    item: { type: NodeType.functionCall },
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
        backgroundColor: isDragging ? "#827DC3" : "#534F8D",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
      }}>
        <p style={{ fontSize: "14px" }}>Function Call</p>
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
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={""}
              disabled
              placeholder='name'
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
              placeholder='description'
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

          <div style={{ marginTop: "10px" }}>
            {[{ key: '', type: '', desc: '' }].map((field, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  gap: "10px"
                }}
              >
                {/* Key Field: 1/5 */}
                <input
                  type="text"
                  placeholder="Key"
                  value={field.key}
                  disabled
                  style={{
                    width: "20%",
                    padding: '5px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#2B2B2B',
                    color: 'white',
                  }}
                />

                {/* Type Dropdown: 1/5 */}
                <div style={{ width: "20%" }}>
                  <NodeDropdown
                    placeholder="Select Type"
                    disabled={true}
                    options={options}
                    onSelect={() => { }}
                  />
                </div>

                {/* Description Field: 3/5 */}
                <input
                  type="text"
                  placeholder="Description"
                  value={field.desc}
                  disabled
                  style={{
                    width: "60%",
                    padding: '5px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#2B2B2B',
                    color: 'white',
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => { }}
              style={{
                marginLeft: '5px',
                padding: '5px 10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#007C34',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Add Field
            </button>
          </div>
        </div>

        <SourceConnector isConnected={false} />
      </div>
    </div>
  );
};

export default FunctionCallDrag;