import { ReactFlow, Background, Controls, MiniMap, useEdgesState, useNodesState, Panel } from '@xyflow/react';
import { useEffect, useMemo, useRef } from 'react';
import dagre from 'dagre';
import { Edge, Node } from '@xyflow/react';
import PaperNode from '@/components/Flow/PaperNode/PaperNode';

const initialNodes = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'Node 3' }, position: { x: 200, y: 50 } },
    { id: '4', data: { label: 'Node 4' }, position: { x: 300, y: 150 } },
    { id: '5', type: 'paper', data: { imageUrl: 'http://localhost:1337/pipeline/xo8v5fs6s3hb3qs9zynttxbs/zCABiR8T1g2_dW_ppgR6U/questions/c9Je1z_MzxuUImrTB9PMR.png' }, position: { x: 400, y: 250 } },
];

const initialEdges = [
    { id: '1-2', source: '1', target: '2' },
    { id: '1-3', source: '1', target: '3' },
    { id: '2-4', source: '2', target: '4' },
    { id: '3-4', source: '3', target: '4' },
];

// Node width and height for Dagre layout calculations
const nodeWidth = 150;
const nodeHeight = 50;

export default function MatchDone() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const reactFlowRef = useRef(null);
    const nodeTypes = useMemo(() => ({ paper: PaperNode }), []);

    // 初始化时自动应用布局
    useEffect(() => {
        // 默认使用垂直布局 'TB'
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges,
            'TB'
        );
        setNodes(layoutedNodes as typeof nodes);
        setEdges(layoutedEdges as typeof edges);
    }, []); // 仅在组件挂载时执行一次

    return (
        <div className="w-full h-full">
            <ReactFlow
                ref={reactFlowRef}
                edges={edges}
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView // 启用自适应视图
                fitViewOptions={{ padding: 0.2 }} // 设置自适应视图选项
            >
                <Background />
                <Controls />
                <MiniMap />
                <Panel position="top-right">
                    <div className="flex gap-2">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => { }}
                        >
                            Next Step
                        </button>
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    )
}

// Helper function to get layout
const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    // Create a new directed graph
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction });

    // Set nodes
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    // Set edges
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // Calculate the layout
    dagre.layout(dagreGraph);

    // Update node positions
    const layoutedNodes = nodes.map((node) => {
        const dagreNode = dagreGraph.node(node.id);

        return {
            ...node,
            position: {
                x: dagreNode.x - nodeWidth / 2,
                y: dagreNode.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};