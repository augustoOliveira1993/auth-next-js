'use client'
import React from 'react';
import {Bar, Cell, ComposedChart, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';

export default function CustosDas() {
    const gerencias = [
        {
            title: "ALTOS FORNOS",
            totalBudget: "1.988.425,28",
            totalSpent: "2.194.435,11",
            balance: "-278.586,46",
            status: "Bloqueio",
        },
        {
            title: "ACIARIA",
            totalBudget: "3.716.590,00",
            totalSpent: "4.095.407,50",
            balance: "-589.945,28",
            status: "Bloqueio",
        },
        {
            title: "LAMINAÇÃO",
            totalBudget: "2.011.262,57",
            totalSpent: "2.065.123,28",
            balance: "-151.296,20",
            status: "Bloqueio",
        },
        {
            title: "TREFILA",
            totalBudget: "385.000,00",
            totalSpent: "393.575,80",
            balance: "-24.721,50",
            status: "Bloqueio",
        },
        {
            title: "ALTOS FORNOS",
            totalBudget: "1.988.425,28",
            totalSpent: "2.194.435,11",
            balance: "-278.586,46",
            status: "Sem verba",
        },
        {
            title: "ACIARIA",
            totalBudget: "3.716.590,00",
            totalSpent: "4.095.407,50",
            balance: "-589.945,28",
            status: "TESTE",
        },
        {
            title: "LAMINAÇÃO",
            totalBudget: "2.011.262,57",
            totalSpent: "2.065.123,28",
            balance: "-151.296,20",
            status: "Alerta",
        },
        {
            title: "TREFILA",
            totalBudget: "385.000,00",
            totalSpent: "393.575,80",
            balance: "-24.721,50",
            status: "Verba ativa",
        },
    ];

    const resolverStatus = (status) => {
        switch (status) {
            case "Bloqueio":
                return "bg-red-600 text-white";
            case "Verba ativa":
                return "bg-green-600 text-white";
            case "Alerta":
                return "bg-yellow-600 text-white";
            case "Sem verba":
                return "bg-violet-600 text-white";
            default:
                return "bg-red-600 text-white"
        }
    };

    const data = [
        {
            title: 'Page A',
            realizado: 590,
            saldo: 800,
            amt: 1400,
            totalBudget: '$2000',
            totalSpent: '$1600',
            balance: '$400',
            status: 'active',
        },
    ];

    const dataPier = [
        {name: 'Saldo', value: 400},
        {name: 'Realizado', value: 300},
    ];

    const COLORS = ['green', 'red'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {gerencias.map((item, index) => (
                    <div key={index} className="border rounded-lg shadow p-4 mb-4 bg-white">
                        <div
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 mb-2">
                            <h2 className="text-xl font-bold mb-2 sm:mb-0">{item.title}</h2>
                            <span
                                className={`${resolverStatus(item.status)} text-xs font-bold me-2 px-2.5 py-0.5 rounded-full`}>
                                {item.status}
                            </span>
                        </div>
                        {/*<div className="flex justify-between mb-4">*/}
                        {/*    <div>*/}
                        {/*        <label className="block text-gray-700 text-xs">Custo Total Orçado</label>*/}
                        {/*        <p className="text-lg font-bold">{item.totalBudget}</p>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <label className="block text-gray-700 text-xs">Custo Total Realizado</label>*/}
                        {/*        <p className="text-lg font-bold">{item.totalSpent}</p>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <label className="block text-gray-700 text-xs">Saldo a consumir</label>*/}
                        {/*        <p className="text-lg font-bold">{item.balance}</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="w-full h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    layout="vertical"
                                    data={data}
                                >
                                    <XAxis
                                        height={10}
                                        width={1}
                                        tick={false}
                                        tickLine={false}
                                        axisLine={false}
                                        type="number"/>
                                    <YAxis
                                        height={10}
                                        width={80}
                                        tick={false}
                                        tickLine={false}
                                        axisLine={false}
                                        dataKey="title" type="category" scale="band"/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="saldo" barSize={15} fill="green" stackId="a"/>
                                    <Bar dataKey="realizado" barSize={15} fill="red" stackId="a"/>
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full h-44">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={dataPier}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {dataPier.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
