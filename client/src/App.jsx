import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import AuthPageModal from "./pages/AuthPageModal/AuthPageModal";
import { AuthProvider } from "./context/AuthContext";
import DetailInfoPageModal from "./pages/DetailInfoPageModal/DetailInfoPageModal";


function App() {

    return (
        <AuthProvider>
            <AuthPageModal />
            <DetailInfoPageModal />
            <Header />
            <Main />
            <Footer />
        </AuthProvider>
    )
}

export default App