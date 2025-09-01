import StandartTableInfo from "../StandartTableInfo/StandartTableInfo";
import { useAuth } from '../../context/AuthContext';
import FullTableInfo from "../FullTableInfo/FullTableInfo";
import MaintenanceTableInfo from "../MaintenanceTableInfo/MaintenanceTableInfo";
import ComplaintTableInfo from "../ComplaintTableInfo/ComplaintTableInfo";
import TabsSelectSection from "../TabsSelectSection/TabsSelectSection";

function Main() {
    const  {isLoggedIn } = useAuth()

    return (
        <main>
            <div className="main-container">
                {isLoggedIn ? <TabsSelectSection /> : <StandartTableInfo />}
            </div>
        </main>
    );
}

export default Main;