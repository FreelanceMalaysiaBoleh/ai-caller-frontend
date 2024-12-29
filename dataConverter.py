import json


# Use this function to get the nodes + edges
def combineNodesAndEdges(nodes, edges):
  for node in nodes:
    node["parameters"] = node.pop("data")
    node["node_id"] = node.pop("id")
    
    if "positionAbsolute" in node:
      del node["positionAbsolute"]
    
    if "selected" in node:
        del node["selected"]
    
    if "dragging" in node:
        del node["dragging"]

    if "height" in node:    
        del node["height"]
    
    if "width" in node:
        del node["width"]

    if "isConnectedTarget" in node["parameters"]:
     del node["parameters"]["isConnectedTarget"]
    
    if "label" in node["parameters"]:
     del node["parameters"]["label"]

    if node["type"] == "Initiate":
      node["parameters"]["runtime"] = "Start"

    if node["type"] == "Function Call" or node["type"] == "API Executor":
      fields = node["parameters"]["fields"]

      args = {
        field["key"]: f'{field["type"]} ({field["desc"]})'
        for field in fields
      }

      node["parameters"]["args"] = args

      del node["parameters"]["fields"]

    node["connections"] = []
  
  for edge in edges:
    target_id = edge["source"]
    connected_id = edge["target"]
    found_object = next((obj for obj in nodes if obj["node_id"] == target_id), None)

    if found_object: 
      found_object["connections"].append(connected_id)

  return nodes

def restoreNodesAndEdges(transformed_nodes):
    restored_nodes = []
    restored_edges = []

    for node in transformed_nodes:
        # Revert the renaming and structural changes
        restored_node = {
            "id": node["node_id"],
            "type": node["type"],
            "data": node.get("parameters", {}),
            "position": node["position"]
        }
        
        if node["type"] == "Function Call" or node["type"] == "API Executor":
            args = node["parameters"]["args"]

            fields = [
                {
                    "key": key,
                    "type": value.split(" (")[0], 
                    "desc": value.split(" (", 1)[1].rstrip(")")
                }
                for key, value in args.items()
            ]

            restored_node["data"]["fields"] = fields

        # Add the restored node to the list
        restored_nodes.append(restored_node)

        # Reconstruct edges from connections
        if "connections" in node:
            for target_id in node["connections"]:
                restored_edges.append({
                    "source": node["node_id"],
                    "target": target_id,
                    "id": f"reactflow__edge-{node['node_id']}-{target_id}",
                })

    return restored_nodes, restored_edges


nodesSample = [
    {
        "id": "1",
        "type": "Initiate",
        "data": {},
        "position": {"x": 43, "y": 20},
        "width": 168,
        "height": 80,
        "selected": False,
        "positionAbsolute": {"x": 43, "y": 20},
        "dragging": False,
    },
    {
        "id": "2",
        "type": "AI Name & Role",
        "data": {
            "label": "empty",
            "name": "Guide Ai",
            "role": "Restaurant Assistant",
            "isConnectedTarget": True,
        },
        "position": {"x": 32, "y": 149},
        "width": 238,
        "height": 114,
        "selected": False,
        "dragging": False,
        "positionAbsolute": {"x": 32, "y": 149},
    },
    {
        "id": "3",
        "type": "Welcoming Message",
        "data": {
            "label": "empty",
            "isConnectedTarget": True,
            "message": "Please say welcome message to client",
        },
        "position": {"x": 31, "y": 309},
        "width": 238,
        "height": 143,
        "selected": False,
        "positionAbsolute": {"x": 31, "y": 309},
        "dragging": False,
    },
    {
        "id": "4",
        "type": "Customer Speech",
        "data": {"label": "empty", "isConnectedTarget": True},
        "position": {"x": 345, "y": 103},
        "width": 200,
        "height": 77,
        "selected": False,
        "positionAbsolute": {"x": 345, "y": 103},
        "dragging": False,
    },
    {
        "id": "5",
        "type": "Boundaries",
        "data": {
            "label": "empty",
            "isConnectedTarget": True,
            "filter": "Topics and Words to avoid",
        },
        "position": {"x": 347, "y": 250},
        "width": 238,
        "height": 143,
        "selected": False,
        "dragging": False,
        "positionAbsolute": {"x": 347, "y": 250},
    },
    {
        "id": "6",
        "type": "Function Call",
        "data": {
            "label": "empty",
            "isConnectedTarget": True,
            "name": "User Data Retriever",
            "description": "Retrieve the user data when user",
            "fields": [
                {"key": "user_name", "desc": "The name of the user", "type": "str"}
            ],
        },
        "position": {"x": 694, "y": -3},
        "width": 525,
        "height": 186,
        "selected": False,
        "dragging": False,
    },
    {
        "id": "7",
        "type": "Function Call",
        "data": {
            "label": "empty",
            "isConnectedTarget": True,
            "name": "User Data Writer",
            "description": "Write the user data when user asks to",
            "fields": [
                {"key": "user_name", "desc": "The name of the user", "type": "str"}
            ],
        },
        "position": {"x": 701, "y": 238},
        "width": 525,
        "height": 186,
        "selected": False,
        "dragging": False,
        "positionAbsolute": {"x": 701, "y": 238},
    },
    {
        "id": "8",
        "type": "Function Call",
        "data": {
            "label": "empty",
            "isConnectedTarget": True,
            "name": "Ticket Writer",
            "description": "Write the ticket when user complain about some issue",
            "fields": [
                {
                    "key": "user_name",
                    "desc": "The name of the user creating the ticket",
                    "type": "str",
                },
                {
                    "key": "description",
                    "desc": "A description of the issue or request",
                    "type": "str",
                },
            ],
        },
        "position": {"x": 699, "y": 480},
        "width": 594,
        "height": 223,
        "selected": False,
        "dragging": False,
        "positionAbsolute": {"x": 699, "y": 480},
    },
    {
        "id": "9",
        "type": "DB Reader",
        "data": {
            "label": "empty",
            "isConnectedTarget": True,
            "description": "Replace the {user_name} with the value from previous node.",
            "query": "SELECT * FROM customers where Name={user_name};",
        },
        "position": {"x": 1392, "y": 120},
        "width": 238,
        "height": 114,
        "selected": False,
        "positionAbsolute": {"x": 1392, "y": 120},
        "dragging": False,
    },
    {
        "id": "10",
        "type": "DB Writer",
        "data": {
            "label": "empty",
            "isConnectedTarget": True,
            "description": "Replace the {user_name} with the value from previous node.",
            "query": "INSERT INTO customers VALUES ({user_name});",
        },
        "position": {"x": 1462.1947290208825, "y": 343.06291764965573},
        "width": 226,
        "height": 114,
        "selected": False,
        "positionAbsolute": {
            "x": 1462.1947290208825,
            "y": 343.06291764965573,
        },
        "dragging": False,
    },
    {
        "id": "11",
        "type": "API Executor",
        "data": {
            "label": "empty",
            "endpoint": "http://api.example.com/ticket",
            "method": "POST",
            "fields": [
                {
                    "key": "user_name",
                    "desc": "The name of the user creating the ticket",
                    "type": "str",
                },
                {
                    "key": "description",
                    "desc": "A description of the issue or request",
                    "type": "str",
                },
            ],
            "isConnectedTarget": True,
        },
        "position": {"x": 1398.036556605187, "y": 517.3286470620696},
        "width": 594,
        "height": 225,
        "selected": False,
        "positionAbsolute": {"x": 1398.036556605187, "y": 517.3286470620696},
        "dragging": False,
    },
    {
        "id": "12",
        "type": "DB Connection",
        "data": {
            "label": "empty",
            "databaseType": "MySQL",
            "db_userName": "root",
            "db_password": "root",
            "db_url": "localhost:2701",
            "isConnectedTarget": True,
        },
        "position": {"x": 1864.3734289034232, "y": 141.15817241569596},
        "width": 238,
        "height": 186,
        "selected": False,
        "positionAbsolute": {"x": 1864.3734289034232, "y": 141.15817241569596},
        "dragging": False,
    },
]

edgesSameple = [
    {
        "source": "1",
        "sourceHandle": None,
        "target": "2",
        "targetHandle": None,
        "id": "reactflow__edge-1-2",
    },
    {
        "source": "2",
        "sourceHandle": None,
        "target": "3",
        "targetHandle": None,
        "id": "reactflow__edge-2-3",
    },
    {
        "source": "3",
        "sourceHandle": None,
        "target": "4",
        "targetHandle": None,
        "id": "reactflow__edge-3-4",
    },
    {
        "source": "4",
        "sourceHandle": None,
        "target": "5",
        "targetHandle": None,
        "id": "reactflow__edge-4-5",
    },
    {
        "source": "5",
        "sourceHandle": None,
        "target": "6",
        "targetHandle": None,
        "id": "reactflow__edge-5-6",
    },
    {
        "source": "5",
        "sourceHandle": None,
        "target": "7",
        "targetHandle": None,
        "id": "reactflow__edge-5-7",
    },
    {
        "source": "5",
        "sourceHandle": None,
        "target": "8",
        "targetHandle": None,
        "id": "reactflow__edge-5-8",
    },
    {
        "source": "6",
        "sourceHandle": None,
        "target": "9",
        "targetHandle": None,
        "id": "reactflow__edge-6-9",
    },
    {
        "source": "7",
        "sourceHandle": None,
        "target": "10",
        "targetHandle": None,
        "id": "reactflow__edge-7-10",
    },
    {
        "source": "8",
        "sourceHandle": None,
        "target": "11",
        "targetHandle": None,
        "id": "reactflow__edge-8-11",
    },
    {
        "source": "9",
        "sourceHandle": None,
        "target": "12",
        "targetHandle": None,
        "id": "reactflow__edge-9-12",
    },
    {
        "source": "10",
        "sourceHandle": None,
        "target": "12",
        "targetHandle": None,
        "id": "reactflow__edge-10-12",
    },
]

# Use this to create the workflow
def combineWorkflow(nodes, edges):
  workflow = {
    "workflow_id": "example_workflow_1",
    "name":"",
    "description":"",
    "nodes":[]
  }

  nodes = combineNodesAndEdges(nodes, edges)

  workflow["nodes"] = nodes

  return workflow

to_print = combineWorkflow(nodesSample, edgesSameple)
print(json.dumps(to_print, indent=2))


