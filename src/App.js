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
// import './redux/axiosDefaults'


function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
          <Routes>
            <Route exact path="/myevent" element={<MyEventScreen />} />
          </Routes>
          <Routes>
            <Route exact path="/newevent" element={<NewEventScreen />} />
          </Routes>
          <Routes>
            <Route exact path="/event/:id" element={<EventScreen />} />
          </Routes>
          <Routes>
            <Route exact path="/event/member/:id" element={<MemberScreen />} />
          </Routes>
          <Routes>
            <Route exact path="/event/edit/:id" element={<EventEdit />} />
          </Routes>
          <Routes>
            <Route exact path="/login" element={<LoginScreen />} />
          </Routes>
          <Routes>
            <Route exact path="/register" element={<RegisterScreen />} />
          </Routes>
          <Routes>
            <Route exact path="/profile" element={<ProfileScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
