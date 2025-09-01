import React, { useState, useEffect } from 'react';
import api from '../../api';
import './StandartTableInfo.css';
import { useAuth } from '../../context/AuthContext';

const StandartTableInfo = () => {
    const { setvisibleDetailInfoModal, setDetailInfo } = useAuth()

    const [machines, setMachines] = useState([]);
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [filters, setFilters] = useState({
        model: '',
        engineModel: '',
        transmissionModel: '',
        drivingAxleModel: '',
        steeringAxleModel: '',
    });

    const fetchData = async (query = "") => {
        try {
            const response = await api.get(`/api/machines/${query ? '?serial_number_machine=' + query : ''}`);
            setMachines(response.data);
            setIsSearching(!!query);
            setNotFound(query && response.data.length === 0);
        } catch (error) {
            console.error('Ошибка при загрузке данных о машинах:', error);
            setMachines([]);
            setNotFound(query ? true : false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = async () => {
        fetchData(search);
    };

    const handleReset = () => {
        setSearch("");
        fetchData();
        setNotFound(false);
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = (items) => {
        return items.filter(item => {
            return (
                (filters.model === '' || item.machine_model.name === filters.model) &&
                (filters.engineModel === '' || item.engine_model.name === filters.engineModel) &&
                (filters.transmissionModel === '' || item.transmission_model.name === filters.transmissionModel) &&
                (filters.drivingAxleModel === '' || item.drive_axle_model.name === filters.drivingAxleModel) &&
                (filters.steeringAxleModel === '' || item.steering_axle_model.name === filters.steeringAxleModel)
            );
        });
    };


    const redirectDetailInfo = (obj_model) => {
        setDetailInfo(obj_model)

        setvisibleDetailInfoModal(true)
    }

    return (
        <div className='main-center'>
            <h1 className="home-header">Проверьте комплектацию и технические характеристики техники Силант</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Заводской номер :"
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Поиск</button>
            </div>
            <p className="home-text">Информация о комплектации и технических характеристиках вашей техники</p>
            <div className="filter-container">
                <label>
                    Модель техники:
                    <select className="filter-select" name="model" value={filters.model} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(machines.map(item => item.machine_model.name))).map((model, index) => (
                            <option key={index} value={model}>{model}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Модель двигателя:
                    <select name="engineModel" value={filters.engineModel} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(machines.map(item => item.engine_model.name))).map((engineModel, index) => (
                            <option key={index} value={engineModel}>{engineModel}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Модель трансмиссии:
                    <select name="transmissionModel" value={filters.transmissionModel} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(machines.map(item => item.transmission_model.name))).map((transmissionModel, index) => (
                            <option key={index} value={transmissionModel}>{transmissionModel}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Модель ведущего моста:
                    <select name="drivingAxleModel" value={filters.drivingAxleModel} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(machines.map(item => item.drive_axle_model.name))).map((drivingAxleModel, index) => (
                            <option key={index} value={drivingAxleModel}>{drivingAxleModel}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Модель управляемого моста:
                    <select name="steeringAxleModel" value={filters.steeringAxleModel} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {Array.from(new Set(machines.map(item => item.steering_axle_model.name))).map((steeringAxleModel, index) => (
                            <option key={index} value={steeringAxleModel}>{steeringAxleModel}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Модель техники</th>
                            <th>Зав. № машины</th>
                            <th>Модель двигателя</th>
                            <th>Зав. № двигателя</th>
                            <th>Модель трансмиссии</th>
                            <th>Зав. № трансмиссии</th>
                            <th>Модель ведущего моста</th>
                            <th>Зав. № ведущего моста</th>
                            <th>Модель управляемого моста</th>
                            <th>Зав. № управляемого моста</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applyFilters(machines).map(machine => (
                            <tr key={machine.serial_number_machine}>
                                <td className="table-model" onClick={() => redirectDetailInfo(machine.machine_model)}>{machine.machine_model.name}</td>
                                <td>{machine.serial_number_machine}</td>
                                <td className="table-model" onClick={() => redirectDetailInfo(machine.engine_model)}>{machine.engine_model.name}</td>
                                <td>{machine.engine_serial_number}</td>
                                <td className="table-model" onClick={() => redirectDetailInfo(machine.transmission_model)}>{machine.transmission_model.name}</td>
                                <td>{machine.transmission_serial_number}</td>
                                <td className="table-model" onClick={() => redirectDetailInfo(machine.drive_axle_model)}>{machine.drive_axle_model.name}</td>
                                <td>{machine.drive_axle_serial_number}</td>
                                <td className="table-model" onClick={() => redirectDetailInfo(machine.steering_axle_model)}>{machine.steering_axle_model.name}</td>
                                <td>{machine.steering_axle_serial_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {notFound && <p>Данных о машине с таким заводским номером нет в системе.</p>}
            </div>
            {isSearching && <button className="reset-button" onClick={handleReset}>Сброс</button>}
        </div>
    );
}

export default StandartTableInfo;