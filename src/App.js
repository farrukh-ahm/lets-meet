import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import EventEdit from "./screens/EventEdit";
import EventScreen from "./screens/EventScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MemberScreen from "./screens/MemberScreen";
import MyEventScreen from "./screens/MyEventScreen";
import NewEventScreen from "./screens/NewEventScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NotFound from "./screens/NoResultsScreen";
import styles from "./App.module.css"
import './redux/axiosDefaults'


function App() {
  return (
    <div className={styles.App}>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
          
            <Route exact path="/myevent" element={<MyEventScreen />} />
          
            <Route exact path="/newevent" element={<NewEventScreen />} />
          
            <Route exact path="/event/:id" element={<EventScreen />} />
          
            <Route exact path="/event/member/:id" element={<MemberScreen />} />
          
            <Route exact path="/event/edit/:id" element={<EventEdit />} />
          
            <Route exact path="/login" element={<LoginScreen />} />
          
            <Route exact path="/register" element={<RegisterScreen />} />
          
            <Route exact path="/profile" element={<ProfileScreen />} />
          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
