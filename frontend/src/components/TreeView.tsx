import React, { useState } from "react";
import TreeNode from "./TreeNode";

const TreeView = ({ data }: any) => {
	const [searchTerm, setSearchTerm] = useState("");

	const treeView = data.map((rootNode: any, index: number) => (
		<TreeNode
			key={index}
			node={rootNode}
			searchTerm={searchTerm.length >= 3 ? searchTerm : ""}
		/>
	));

	return (
		<div style={{ padding: 20 }}>
			<input
				type="text"
				placeholder="Search..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ width: 300, height: 30 }}
			/>
			{treeView}
		</div>
	);
};

export default TreeView;
