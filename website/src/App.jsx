import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import OrderForm from "./Orderform";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet>
        <OrderForm />
        <AdminDashboard />
      </Outlet>
      <Toaster />
    </>
  );
}

export default App;
