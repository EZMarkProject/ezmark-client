import { ReactFlow, Background, Controls, MiniMap, useEdgesState, useNodesState, Panel } from '@xyflow/react';
import { useEffect, useMemo } from 'react';
import dagre from 'dagre';
import { Edge, Node } from '@xyflow/react';
import { PaperNode } from '@/components/Flow/PaperNode';
import { StudentNode } from '@/components/Flow/StudentNode';

const initialNodes = [
    { id: '5', type: 'paper', data: { imageUrl: 'http://localhost:1337/pipeline/xo8v5fs6s3hb3qs9zynttxbs/zCABiR8T1g2_dW_ppgR6U/questions/c9Je1z_MzxuUImrTB9PMR.png' }, position: { x: 400, y: 100 } },
    { id: '6', type: 'student', data: { studentName: 'Kelvin Qiu', studentId: '21207231' }, position: { x: 400, y: 300 } },
    { id: '7', type: 'paper', data: { imageUrl: 'http://localhost:1337/pipeline/xo8v5fs6s3hb3qs9zynttxbs/zCABiR8T1g2_dW_ppgR6U/questions/c9Je1z_MzxuUImrTB9PMR.png' }, position: { x: 400, y: 100 } },
    { id: '8', type: 'student', data: { studentName: 'Kelvin Qiu', studentId: '21207231' }, position: { x: 400, y: 300 } },
];

const initialEdges = [
    { id: '5-6', source: '5', target: '6' },
    { id: '7-8', source: '7', target: '8' },
];

const nodeWidth = 500; // 增加节点宽度
const nodeHeight = 300; // 增加节点高度，确保有足够空间

export default function MatchDone() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const nodeTypes = useMemo(() => ({ paper: PaperNode, student: StudentNode }), []);

    // 初始化时自动应用布局
    useEffect(() => {
        // 默认使用垂直布局 'TB'
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges,
            'TB'
        );
        setNodes([...layoutedNodes] as typeof nodes);
        setEdges([...layoutedEdges] as typeof edges);
    }, []); // 仅在组件挂载时执行一次

    return (
        <div className="w-full h-full">
            <ReactFlow
                edges={edges}
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView // 启用自适应视图
                fitViewOptions={{ padding: 0.5 }} // 增加边距使节点可见性更好
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

    // 设置节点之间的间距
    dagreGraph.setGraph({
        rankdir: direction,
        nodesep: 200, // 水平间距
        ranksep: 300  // 垂直间距 - 增加这个值使节点上下间距更大
    });

    // Set nodes with actual dimensions
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