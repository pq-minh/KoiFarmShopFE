import React, { useEffect, useState } from 'react';
import api from "../../../config/axios";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const RevenueChart = () => {
    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1); // Last 12 months

            try {
                const response = await api.get('/orders/management/get', {
                    params: {
                        status: 'Completed',
                        startDate: startDate.toISOString().split('T')[0],
                        endDate: endDate.toISOString().split('T')[0],
                    },
                });

                const orders = response.data;
                const revenueData = {};

                orders.forEach(order => {
                    const orderDate = new Date(order.createDate);
                    const monthYear = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
                    revenueData[monthYear] = (revenueData[monthYear] || 0) + order.totalAmount;
                });

                const points = [];
                for (let i = 0; i < 12; i++) {
                    const monthDate = new Date();
                    monthDate.setMonth(monthDate.getMonth() - i);
                    const monthYear = `${monthDate.getMonth() + 1}-${monthDate.getFullYear()}`;
                    points.push({
                        x: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1),
                        y: revenueData[monthYear] || 0,
                    });
                }

                setDataPoints(points.reverse());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: "Doanh thu kinh doanh cá Koi theo tháng"
        },
        axisY: {
            includeZero: true,
            title: "Doanh thu (VND)" // Y-axis label
        },
        axisX: {
            interval: 1,
            labelFormatter: function(e) {
                const date = new Date(e.value);
                return `${date.getMonth() + 1}/${date.getFullYear()}`;
            },
            intervalType: "month",
            title: "Thời gian (12 tháng trở lại đây)" // X-axis label
        },
        data: [{
            type: "column",
            indexLabel: "{y}",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: dataPoints,
        }]
    };

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default RevenueChart;
