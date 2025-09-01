import React, { useState, useEffect } from 'react';
import api from '../../api';

const MaintenanceTableInfo = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        maintenanceType: '',
        serialNumber: '',
        serviceCompany: '',
    });

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.get(`/api/maintenance/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
        
        } catch (error) {
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
                (filters.serialNumber === '' || item.serial_number_machine === filters.serialNumber) &&
                (filters.maintenanceType === '' || item.maintenance_type === filters.maintenanceType) &&
                (filters.serviceCompany === '' || item.service_company === filters.serviceCompany)
            );
        });
    };

    return (
        <>
            <p className="home-text">Информация о комплектации и технических характеристиках вашей техники</p>
            <div className="filter-container">
                <label>
                    Зав. номер машины:
                    <select className="filter-select" name="serialNumber" value={filters.serialNumber} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(data.map(item => item.serial_number_machine))).map((serial, index) => (
                            <option key={index} value={serial}>{serial}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Вид ТО:
                    <select name="maintenanceType" value={filters.maintenanceType} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(data.map(item => item.maintenance_type))).map((type, index) => (
                            <option key={index} value={type}>{type}</option>
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
                            <th>Вид ТО</th>
                            <th>Дата проведения ТО</th>
                            <th>Наработка, м/час</th>
                            <th>№ заказ-наряда</th>
                            <th>Дата заказ-наряда</th>
                            <th>Организация, проводившая ТО</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applyFilters(data).map(item => (
                            <tr key={item.id}>
                                <td>{item.serial_number_machine}</td>
                                <td>{item.maintenance_type}</td>
                                <td>{item.maintenance_date}</td>
                                <td>{item.hours_worked}</td>
                                <td>{item.order_number}</td>
                                <td>{item.order_date}</td>
                                <td>{item.service_company}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </>
    )
}

export default MaintenanceTableInfo;