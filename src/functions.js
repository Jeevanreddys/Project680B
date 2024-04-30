// // Function to parse input variables
// export const parseVariablesInput = (input,setGraphInput) => {
//     const variables = {};
//     input.split("\n").forEach((line) => {
//         const parts = line.trim().split(" ");
//         const variable = parts.shift();
//         variables[variable] = parts.map(Number);
//     });
//     return variables;
//     //setGraphInput(input);
// };
// setGraphInput(input);

// // Function to parse graph input
// export const parseGraphInput = (input,setGraph) => {
//     const graph = {};
//     input.split("\n").forEach((line) => {
//         const [node1, node2] = line.trim().split(" ").map(Number);
//         if (!graph[node1]) {
//             graph[node1] = [];
//         }
//         graph[node1].push(node2);
//     });
//     return graph;
// };

// // Function to extend the given path from the start node to the end node if possible
// export const extendPath = (graph, startNode, endNode, path) => {
//     if (path[0] === startNode && path[path.length - 1] === endNode) {
//         return [path];
//     }
//     if (path.length > 1.3 * Object.keys(graph).length) {
//         return [];
//     }
//     const extendedPaths = [];
//     if (path[0] !== startNode) {
//         const current = path[0];
//         const nextNodes = graph[current] || [];
//         for (const nextNode of nextNodes) {
//             extendedPaths.push(
//                 ...extendPath(graph, startNode, endNode, [nextNode, ...path])
//             );
//         }
//     }
//     if (path[path.length - 1] !== endNode) {
//         const current = path[path.length - 1];
//         const nextNodes = graph[current] || [];
//         for (const nextNode of nextNodes) {
//             extendedPaths.push(
//                 ...extendPath(graph, startNode, endNode, [...path, nextNode])
//             );
//         }
//     }
//     return extendedPaths;
// };

// // Function to find DU paths for each variable in the graph
// export const findDUPaths = (
//     graph,
//     defVariables,
//     usageVariables,
//     startNodeInput,
//     endNodeInput
// ) => {
//     const results = {};
//     for (const variable in defVariables) {
//         results[variable] = [];
//         for (const start of defVariables[variable]) {
//             for (const usageNode of usageVariables[variable]) {
//                 const visited = {};
//                 for (const node in graph) {
//                     visited[node] = false;
//                 }
//                 dfs(graph, start, variable, usageNode, visited, [], results);
//             }
//         }
//     }
//     return results;
// };

// // Function to calculate DU pairs for each variable in the graph
// export const calculateDUPairs = (_graph, defVariables, usageVariables) => {
//     const duPairs = {};
//     for (const variable in defVariables) {
//         duPairs[variable] = [];
//         for (const defNode of defVariables[variable]) {
//             for (const usageNode of usageVariables[variable]) {
//                 duPairs[variable].push([defNode, usageNode]);
//             }
//         }
//     }
//     return duPairs;
// };

// // Depth-first search to find all paths from start to any usage node of the variable in the graph.
// const dfs = (graph, current, variable, usageNode, visited, path, results) => {
//     visited[current] = true;
//     path.push(current);
//     if (current === usageNode && path.length >= 2) {
//         results[variable].push([...path]);
//     } else {
//         const neighbors = graph[current];
//         if (neighbors && Array.isArray(neighbors)) {
//             for (const neighbor of neighbors) {
//                 if (!visited[neighbor] || neighbor === usageNode) {
//                     dfs(graph, neighbor, variable, usageNode, visited, path, results);
//                 }
//             }
//         }
//     }
//     path.pop();
//     visited[current] = false;
// };

// // Function to extend DU paths from start to end nodes
// export const extendingDUPathStartToEnd = (graph, startNode, endNode, duPaths) => {
//     const allPaths = {};
//     for (const variable in duPaths) {
//         allPaths[variable] = [];
//         for (const path of duPaths[variable]) {
//             allPaths[variable].push(...extendPath(graph, startNode, endNode, path));
//         }
//     }
//     return allPaths;
// };

// // Function to calculate all def coverage
// export const calculateAllDefCoverage = (duPaths, defVariables) => {
//     const coveredDefNodes = {};
//     for (const variable in defVariables) {
//         coveredDefNodes[variable] = new Set();
//     }
//     const allPaths = [];
//     for (const variable in duPaths) {
//         for (const path of duPaths[variable]) {
//             const nodes = new Set(path);
//             for (const node of nodes) {
//                 if (defVariables[variable].includes(node)) {
//                     coveredDefNodes[variable].add(node);
//                 }
//             }
//             allPaths.push([variable, path]);
//             if (coveredDefNodes[variable].size === defVariables[variable].length) {
//                 break;
//             }
//         }
//     }
//     return allPaths;
// };

// // Function to calculate all usage coverage
// export const calculateAllUsageCoverage = (duPaths, defVariables, usageVariables) => {
//     const coveredPaths = {};
//     for (const variable in usageVariables) {
//         coveredPaths[variable] = [];
//     }
//     const allPaths = [];
//     for (const variable in duPaths) {
//         for (const path of duPaths[variable]) {
//             const defNodesToCover = new Set(defVariables[variable]);
//             const usageNodesToCover = new Set(usageVariables[variable]);
//             for (const node of path) {
//                 if (defNodesToCover.has(node)) {
//                     defNodesToCover.delete(node);
//                 }
//                 if (usageNodesToCover.has(node)) {
//                     usageNodesToCover.delete(node);
//                 }
//             }
//             if (defNodesToCover.size === 0 && usageNodesToCover.size === 0) {
//                 coveredPaths[variable].push([...path]);
//             }
//             allPaths.push([variable, path]);
//         }
//     }
//     return allPaths;
// };
