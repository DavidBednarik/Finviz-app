import React, { useState } from "react";

type ImageNet = {
	name: string;
	size: number;
	children?: ImageNet[];
};

type TreeNodeProps = {
	node: ImageNet;
};

const TreeNode = ({ node }: TreeNodeProps) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandCategory = () => setExpanded(!expanded);

	return (
		<div>
			<div
				onClick={handleExpandCategory}
				style={{
					backgroundColor: node.size > 0 && expanded ? "#ADD8E6" : "white",
					width: "fit-content",
					padding: 5,
					margin: 5,
					borderRadius: 5,
					cursor: "pointer",
				}}
			>
				{node.name} ({node.size})
			</div>
			{expanded && node.children && (
				<div
					style={{
						marginLeft: "20px",
					}}
				>
					{node.children.map((child: any, index: number) => (
						<TreeNode key={index} node={child} />
					))}
				</div>
			)}
		</div>
	);
};

export default TreeNode;
