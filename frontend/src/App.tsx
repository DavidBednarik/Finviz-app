import React, { useState, useEffect } from "react";

function TreeNode({ node }: any) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div>
			<div onClick={() => setExpanded(!expanded)}>
				{node.name} ({node.size})
			</div>
			{expanded && node.children && (
				<div style={{ marginLeft: "20px" }}>
					{node.children.map((child: any, index: number) => (
						<TreeNode key={index} node={child} />
					))}
				</div>
			)}
		</div>
	);
}

function TreeView({ data }: any) {
	return (
		<div>
			{data.map((rootNode: any, index: number) => (
				<TreeNode key={index} node={rootNode} />
			))}
		</div>
	);
}

function App() {
	const [treeData, setTreeData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		// Fetch tree data from the backend (with pagination)
		fetch("http://localhost:3000/imagenet/tree?page=1&limit=100")
			.then((res) => res.json())
			.then((data) => setTreeData(data));
	}, []);

	const filteredData = treeData.filter((node: any) =>
		node.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			<input
				type="text"
				placeholder="Search..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<TreeView data={filteredData} />
		</div>
	);
}

export default App;
