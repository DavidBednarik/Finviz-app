import React, { useEffect, useState } from "react";

type ImageNet = {
	name: string;
	size: number;
	children?: ImageNet[];
};

type TreeNodeProps = {
	node: ImageNet;
	searchTerm: string;
};

const TreeNode = ({ node, searchTerm }: TreeNodeProps) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandCategory = () => setExpanded(!expanded);

	const containsSearchTerm = (node: ImageNet): boolean => {
		if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
			return true;
		}
		if (node.children) {
			return node.children.some((child) => containsSearchTerm(child));
		}
		return false;
	};

	useEffect(() => {
		if (searchTerm) {
			setExpanded(containsSearchTerm(node));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);

	const getHighlightedName = () => {
		if (!searchTerm) return node.name;

		const regex = new RegExp(`(${searchTerm})`, "gi");
		const parts = node.name.split(regex);

		return parts.map((part: string, i: number) =>
			part.toLowerCase() === searchTerm.toLowerCase() ? (
				<span key={i} style={{ backgroundColor: "yellow" }}>
					{part}
				</span>
			) : (
				<span key={i}>{part}</span>
			)
		);
	};

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
				{getHighlightedName()} ({node.size})
			</div>
			{expanded && node.children && (
				<div
					style={{
						marginLeft: "20px",
					}}
				>
					{node.children.map((child: any, index: number) => (
						<TreeNode key={index} node={child} searchTerm={searchTerm} />
					))}
				</div>
			)}
		</div>
	);
};

export default TreeNode;
