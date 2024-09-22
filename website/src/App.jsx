import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import OrderForm from "./Orderform";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet>
        <OrderForm />
      </Outlet>
      <Toaster />
    </>
  );
}

export default App;
