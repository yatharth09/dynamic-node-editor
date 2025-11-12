from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    graph = {node: [] for node in nodes}
    for edge in edges:
        if len(edge) == 2:
            src, dest = edge
            if src in graph:
                graph[src].append(dest)

    visited = set()
    rec_stack = set()

    def is_cyclic(v):
        visited.add(v)
        rec_stack.add(v)

        for neighbor in graph.get(v, []):
            if neighbor not in visited:
                if is_cyclic(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True

        rec_stack.remove(v)
        return False

    has_cycle = any(is_cyclic(node) for node in nodes if node not in visited)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_valid_dag": not has_cycle
    }
