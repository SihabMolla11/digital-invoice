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
    </>
  );
}

export default App;
