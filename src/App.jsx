import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Az104 from "./pages/Az104";
import Az305 from "./pages/Az305";
import "./App.css";

/**
 * CENTRAL REGISTRY (single place to add new exams)
 */
const exams = [
  { name: "AZ-104", path: "/az104", component: Az104 },
  { name: "AZ-305", path: "/az305", component: Az305 },
];

/**
 * MASTER LANDING PAGE
 */
function Home() {
  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-3xl font-bold mb-6">
        Azure Exam Infographics
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        {exams.map((exam) => (
          <Link
            key={exam.path}
            to={exam.path}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{exam.name}</h2>
            <p className="text-slate-500 mt-2">
              View infographic
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * APP ROOT WITH ROUTING
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        
        {/* 🔝 GLOBAL NAV BAR */}
        <nav className="bg-white border-b px-6 py-3 flex gap-4">
          <Link to="/" className="font-semibold">
            Home
          </Link>

          {exams.map((exam) => (
            <Link key={exam.path} to={exam.path}>
              {exam.name}
            </Link>
          ))}
        </nav>

        {/* 🔁 ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />

          {exams.map((exam) => (
            <Route
              key={exam.path}
              path={exam.path}
              element={<exam.component />}
            />
          ))}
        </Routes>

      </div>
    </BrowserRouter>
  );
}
