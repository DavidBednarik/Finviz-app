import React, { useState, useEffect } from "react";
import TreeView from "./components/TreeView";

const API_URL = "http://localhost:3000/imagenet/tree";

function App() {
	const [treeData, setTreeData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTreeData = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				setTreeData(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchTreeData();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return <TreeView data={treeData} />;
}

export default App;
