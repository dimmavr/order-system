import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';

import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Items from './pages/Items';
import Orders from './pages/Orders';
import Payments from './pages/Payments';
import NewCustomer from './pages/NewCustomer';
import NewItem from './pages/NewItem';
import NewOrder from './pages/NewOrder';
import NewPayment from './pages/NewPayment';
import CustomerList from './pages/CustomerList';
import OrderList from './pages/OrderList';
import PaymentList from './pages/PaymentList';
import CustomerCardPage from './pages/CustomerCardPage';








function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="items" element={<Items />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="customers/new" element={<NewCustomer />} />
          <Route path="items/new" element={<NewItem />} />
          <Route path="orders/new" element={<NewOrder />} />
          <Route path="payments/new" element={<NewPayment />} />
          <Route path="customers/search" element={<CustomerList />} />
          <Route path="/orders/list" element={<OrderList />} />
          <Route path="/payments/list" element={<PaymentList />} />
         <Route path="/customers/card" element={<CustomerCardPage />} />



        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
