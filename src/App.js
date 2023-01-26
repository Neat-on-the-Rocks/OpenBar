import Messenger from "components/Messenger";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConversationsPage from "scenes/conversationsPage/ConversationsPage";
import HomePage from 'scenes/homePage/HomePage'
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";

function App() {

  const mode = useSelector((state) => state.mode)

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/conversations/:userId" element={<ConversationsPage />}/>
        <Route path="/messenger/:conversationId" element={<Messenger />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
