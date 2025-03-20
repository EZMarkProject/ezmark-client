import { ReactFlow, Background, Controls, MiniMap, useEdgesState, useNodesState, Panel, addEdge } from '@xyflow/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dagre from 'dagre';
import { Edge, Node } from '@xyflow/react';
import { PaperNode } from '@/components/Flow/PaperNode';
import { StudentNode } from '@/components/Flow/StudentNode';
import { MatchDoneProps } from './interface';
import { useTheme } from 'next-themes';
import { generatePaperNodes, generateStudentNodes, generateEdges } from '@/lib/flow';

const nodeWidth = 500;
const nodeHeight = 300;

export default function MatchDone({ schedule, classData }: MatchDoneProps) {
    const allNodes = [...generatePaperNodes(schedule), ...generateStudentNodes(classData)];
    const allEdges = generateEdges(schedule);
    const [nodes, setNodes, onNodesChange] = useNodesState(allNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(allEdges);
    const nodeTypes = useMemo(() => ({ paper: PaperNode, student: StudentNode }), []);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const onConnect = useCallback((params: any) => {
        // 如果任何一个node以经连接过，则不连接
        if (edges.some((edge) => edge.source === params.source || edge.target === params.target)) {
            return;
        }
        setEdges((eds) => addEdge({ ...params, animated: true }, eds));
        // TODO: 连接成功后，调用接口，更新匹配结果
    }, []);

    // 确保有权限访问主题后再渲染
    useEffect(() => {
        setMounted(true);
    }, []);

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
    }, []);

    return (
        <div className="w-full h-full">
            <ReactFlow
                edges={edges}
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                colorMode={mounted && theme === 'dark' ? 'dark' : 'light'}
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
                            TODO
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