import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import './DetailInfoPageModal.css';

const DetailInfoPageModal = () => {
    const { visibleDetailInfoModal, setvisibleDetailInfoModal, detailInfo, setDetailInfo } = useAuth();

    const rootClasses = ["modal"]
    if (visibleDetailInfoModal) {
        rootClasses.push("active")
    }

    const closePage = () => {
        setDetailInfo(null)
        setvisibleDetailInfoModal(false)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => closePage()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-container">
                    <h3>{detailInfo ? detailInfo.name : ''}</h3>
                    <p>{detailInfo ? detailInfo.description : ''}</p>
                    <button onClick={() => closePage()}>назад</button>
                </div>
            </div>
        </div>
    )
}

export default DetailInfoPageModal;