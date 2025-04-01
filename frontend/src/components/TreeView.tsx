import React from "react";
import TreeNode from "./TreeNode";

const TreeView = ({ data }: any) => {
	const treeView = data.map((rootNode: any, index: number) => (
		<TreeNode key={index} node={rootNode} />
	));

	return <div>{treeView}</div>;
};

export default TreeView;
