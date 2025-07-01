import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomerCard from '../components/CustomerCard'; // όπου έχεις το component
import React from 'react';


function CustomerCardPage() {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('id');

  const [customerData, setCustomerData] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);

  useEffect(() => {
    if (!customerId) return;

    // Mock fetch (αντικατέστησε με axios/fetch API κτλ)
    const fetchData = async () => {
      // Προσομοίωση delay
      await new Promise(r => setTimeout(r, 300));

      // Dummy data (θα έρθουν από API)
      const mockCustomer = {
        id: customerId,
        name: 'Γιώργος Παπαδόπουλος',
        tax_id: '123456789',
        phone: '6940000000',
        email: 'gp@example.com',
      };

      const mockOrders = [
        { id: 1, date: '2024-06-01', amount: 500, status: 'paid' },
        { id: 2, date: '2024-06-10', amount: 300, status: 'unpaid' },
      ];

      const mockPayments = [
        { id: 1, date: '2024-06-05', amount: 500 },
        { id: 2, date: '2024-06-18', amount: 100 },
      ];

      setCustomerData(mockCustomer);
      setOrdersData(mockOrders);
      setPaymentsData(mockPayments);
    };

    fetchData();
  }, [customerId]);

  const handleAddPayment = (amount) => {
    // εδώ κάνεις POST στο API ή update state τοπικά
    console.log('Νέα πληρωμή:', amount);
    // πχ προσθέτεις το νέο payment τοπικά (mock)
    setPaymentsData(prev => [
      ...prev,
      {
        id: prev.length + 1,
        date: new Date().toISOString().slice(0, 10),
        amount,
      },
    ]);
  };

  return (
    <div>
      <CustomerCard
        customer={customerData}
        orders={ordersData}
        payments={paymentsData}
        onAddPayment={handleAddPayment}
      />
    </div>
  );
}

export default CustomerCardPage;
