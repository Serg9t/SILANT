import React, { useState, useEffect } from 'react';
import api from '../../api';

const ComplaintTableInfo = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        failureNode: '',
        restorationMethod: '',
        serviceCompany: '',
    });

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.get(`/api/complaint/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = (items) => {
        return items.filter(item => {
            return (
                (filters.failureNode === '' || item.failure_point === filters.failureNode) &&
                (filters.restorationMethod === '' || item.restoration_method === filters.restorationMethod) &&
                (filters.serviceCompany === '' || item.service_company === filters.serviceCompany)
            );
        });
    };

    return (
        <>
            <p className="home-text">Информация о комплектации и технических характеристиках вашей техники</p>
            <div className="filter-container">
                <label>
                    Узел отказа:
                    <select className="filter-select" name="failureNode" value={filters.failureNode} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(data.map(item => item.failure_point))).map((node, index) => (
                            <option key={index} value={node}>{node}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Способ восстановления:
                    <select name="restorationMethod" value={filters.restorationMethod} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(data.map(item => item.restoration_method))).map((method, index) => (
                            <option key={index} value={method}>{method}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Сервисная компания:
                    <select name="serviceCompany" value={filters.serviceCompany} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(data.map(item => item.service_company))).map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                        ))}
                    </select>
                </label>

            </div>
            <div className="table-container table-height">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Зав. № машины</th>
                            <th>Дата отказа</th>
                            <th>Наработка, м/час</th>
                            <th>Узел отказа</th>
                            <th>Описание отказа</th>
                            <th>Способ восстановления</th>
                            <th>Используемые запасные части</th>
                            <th>Дата восстановления</th>
                            <th>Время простоя техники</th>
                            <th>Сервисная компания</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applyFilters(data).map(item => (
                            <tr key={item.id}>
                                <td>{item.machine}</td>
                                <td>{item.date_refusal}</td>
                                <td>{item.hours_worked}</td>
                                <td>{item.failure_point}</td>
                                <td>{item.failure_description}</td>
                                <td>{item.restoration_method}</td>
                                <td>{item.used_spare_parts}</td>
                                <td>{item.restoration_date}</td>
                                <td>{item.tech_downtime}</td>
                                <td>{item.service_company}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </>
    )
}

export default ComplaintTableInfo;