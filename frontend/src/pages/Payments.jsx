import { useState } from 'react';

function Payments() {
  const [payments] = useState([
    {
      id: 1,
      customer: 'Γιώργος Παπαδόπουλος',
      date: '2025-06-30',
      amount: 200.00,
    },
    {
      id: 2,
      customer: 'Μαρία Κωνσταντίνου',
      date: '2025-06-28',
      amount: 145.00,
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Πληρωμές</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Νέα Πληρωμή
        </button>
      </div>

      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Πελάτης</th>
            <th className="p-2">Ημερομηνία</th>
            <th className="p-2">Ποσό (€)</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{payment.customer}</td>
              <td className="p-2">{payment.date}</td>
              <td className="p-2">{payment.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
