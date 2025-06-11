import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Ebooks from "./pages/Ebooks";
import Notes from "./pages/Notes";
import PastPaper from "./pages/PastPaper";
import RedirectIfAuth from "./components/RedirectIf/RedirectIf";
import Uploads from "./pages/Admin/Uploads";
import EbookCategory from "./pages/Ebooks/EbooksCategory";
import NotesCategory from "./pages/Notes/NotesCategory";
import PastPapers from "./pages/PastPapersCategory/PastPapersCategory";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <Signup />
            </RedirectIfAuth>
          }
        />
        <Route path="/ebooks" element={<Ebooks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/past-papers" element={<PastPaper />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/uploads/"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <Uploads />
            </ProtectedRoutes>
          }
        />
        <Route path="/ebooks/:category/:subject" element={<EbookCategory />} />{" "}
        <Route path="/notes/:category/:subject" element={<NotesCategory />} />{" "}
        <Route path="/past-papers/:subject" element={<PastPapers />} />{" "}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
