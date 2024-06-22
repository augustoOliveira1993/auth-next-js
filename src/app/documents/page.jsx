'use client';
import { useEffect, useState } from 'react';

export default function Documentos() {
    const [documentos, setDocumentos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDocumentos, setFilteredDocumentos] = useState([]);

    useEffect(() => {
        fetch('https://localhost:3002/api/document')
            .then(res => res.json())
            .then(data => {
                const treeData = orgTreeData(data);
                setDocumentos(treeData);
                setFilteredDocumentos(treeData);
            });
    }, []);

    function orgTreeData(data) {
        const document = JSON.parse(JSON.stringify(data));
        const document2 = [];

        const findOrCreateNode = (tree, posicoes) => {
            let currentLevel = tree;

            for (let i = 0; i < posicoes.length; i++) {
                const id = posicoes[i];
                let node = currentLevel.find(item => item.id.split('.').pop() === id);

                if (!node) {
                    node = {
                        id: posicoes.slice(0, i + 1).join('.'),
                        name: '',
                        url: '',
                        children: [],
                        totalChild: 0
                    };
                    currentLevel.push(node);
                }

                currentLevel = node.children;
            }

            return currentLevel;
        }

        document.forEach(item => {
            const posicoes = item.id.split('.');
            const currentLevel = findOrCreateNode(document2, posicoes.slice(0, -1));
            const node = {
                id: item.id,
                name: item.name,
                url: item.url || null,
                children: [],
                totalChild: document.filter(totalItem => totalItem.id.startsWith(item.id + '.')).length
            };

            currentLevel.push(node);
        });
        return document2;
    }

    const toggleExpand = (node) => {
        node.expanded = !node.expanded;
        setFilteredDocumentos([...filteredDocumentos]);
    };

    const renderTree = nodes => (
        <ul className="list-none pl-4">
            {nodes.map((node) => (
                <li key={node.id} className="mb-2">
                    <div
                        className="cursor-pointer flex items-center"
                        onClick={() => toggleExpand(node)}
                    >
                        {node.children.length > 0 && (
                            <span className="mr-2">
                                {node.expanded ? '-' : '+'}
                            </span>
                        )}
                        <span>{node.name}</span>
                        <span className="ml-2 text-gray-500">({node.totalChild} children)</span>
                    </div>
                    {node.expanded && node.children.length > 0 && renderTree(node.children)}
                </li>
            ))}
        </ul>
    );

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredDocumentos(documentos);
        } else {
            const filterNodes = (nodes) => {
                return nodes
                    .map((node) => {
                        if (node.name.toLowerCase().includes(query.toLowerCase())) {
                            return { ...node, children: filterNodes(node.children), expanded: true };
                        } else {
                            const filteredChildren = filterNodes(node.children);
                            if (filteredChildren.length > 0) {
                                return { ...node, children: filteredChildren, expanded: true };
                            }
                        }
                        return null;
                    })
                    .filter(Boolean);
            };

            const filteredData = filterNodes(documentos);
            setFilteredDocumentos(filteredData);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Documentos</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Buscar..."
                className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            {renderTree(filteredDocumentos)}
        </div>
    );
}
