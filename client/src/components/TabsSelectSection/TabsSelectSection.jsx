import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './TabsSelectSection.css';
import FullTableInfo from '../FullTableInfo/FullTableInfo';
import MaintenanceTableInfo from '../MaintenanceTableInfo/MaintenanceTableInfo';
import ComplaintTableInfo from '../ComplaintTableInfo/ComplaintTableInfo';

const TabsSelectSection = () => {
    const { user, isLoading } = useAuth();

    const [selectTable, setSelectTable] = useState('full');

    const handleSelectFull = () => {
        setSelectTable('full')
    }

    const handleSelectMaintenance = () => {
        setSelectTable('maintenance');
    }

    const handleSelectComplaint = () => {
        setSelectTable('complaint')
    }

    return (
        <div className="main-center">
            <h1 className="home-header">{user}</h1>
            <div className="select-section">
                <button
                    className={selectTable === 'full' ? 'select-color' : 'standart-color'}
                    onClick={handleSelectFull}
                >
                    Общая информация
                </button>
                <button
                    className={selectTable === 'maintenance' ? 'select-color' : 'standart-color'}
                    onClick={handleSelectMaintenance}
                >
                    ТО
                </button>
                <button
                    className={selectTable === 'complaint' ? 'select-color' : 'standart-color'}
                    onClick={handleSelectComplaint}
                >
                    Рекламации
                </button>
            </div>
            {selectTable === 'full' && <FullTableInfo />}
            {selectTable === 'maintenance' && <MaintenanceTableInfo />}
            {selectTable === 'complaint' && <ComplaintTableInfo />}
        </div>
    )
}

export default TabsSelectSection;