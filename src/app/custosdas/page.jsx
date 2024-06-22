'use client'
import React from 'react';
import {Bar, Cell, ComposedChart, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,BarChart, CartesianGrid, LabelList} from 'recharts';

export default function CustosDas() {
    const gerencias = [
            { pacote: 'TI / COMUNICAÇÃO', total_orc_pacote: 12589 },
            { pacote: 'MATERIAIS APLICADOS', total_orc_pacote: 59863 },
            { pacote: 'OFICINA DE CILINDROS', total_orc_pacote: 0 },
            { pacote: 'PESSOAL', total_orc_pacote: 54200 },
            { pacote: 'SESMT', total_orc_pacote: 79863 },
            { pacote: 'COMBUSTÍVEL E LUBRIFICANTE', total_orc_pacote: 0 },
            { pacote: 'TRANSPORTE', total_orc_pacote: 0 },
            { pacote: 'MANUTENÇÃO', total_orc_pacote: 12450 },
            { pacote: 'INFRAESTRUTURA', total_orc_pacote: 0 },
            { pacote: 'MATERIAL DE CONSUMO', total_orc_pacote: 0 },
            { pacote: 'SERVIÇOS DE TERCEIROS', total_orc_pacote: 85990 },
            { pacote: 'VIAGENS', total_orc_pacote: 0 },
            { pacote: 'DISTRIBUIÇÃO E LOGÍSTICA', total_orc_pacote: 0 },
            { pacote: 'UTILIDADES', total_orc_pacote: 0 },
            { pacote: 'ANUIDADE/PUBLICIDADE/SEGUROS', total_orc_pacote: 78540 },
            { pacote: 'MÁQUINAS E EQUIPAMENTOS', total_orc_pacote: 0 },
            { pacote: 'SUCATA', total_orc_pacote: 0 },
            { pacote: 'JURÍDICO', total_orc_pacote: 0 },
            { pacote: 'MARKETING E VENDAS', total_orc_pacote: 0 }
        ]
    ;

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

    const formatYAxis = (tickItem) => {
        if (tickItem >= 1000) {
            return `${Math.round(tickItem / 1000)}mil`;
        }
        return tickItem;
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
                        <div className="w-full h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={730} height={250} data={gerencias}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis tickFormatter={formatYAxis} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total_orc_pacote" fill="#8884d8">
                                        <LabelList dataKey="total_orc_pacote" position="top" formatter={(value) => value>0 ? formatYAxis(value) : ''} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
