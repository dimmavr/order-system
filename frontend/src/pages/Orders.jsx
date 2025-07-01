import { useState } from 'react';

function Orders() {
  const [orders] = useState([
    {
      id: 1,
      customer: 'Γιώργος Παπαδόπουλος',
      date: '2025-06-30',
      total: 325.50,
      status: 'Εξοφλημένη',
    },
    {
      id: 2,
      customer: 'Μαρία Κωνσταντίνου',
      date: '2025-06-29',
      total: 145.00,
      status: 'Μη εξοφλημένη',
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Παραγγελίες</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Νέα Παραγγελία
        </button>
      </div>

      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Πελάτης</th>
            <th className="p-2">Ημερομηνία</th>
            <th className="p-2">Σύνολο (€)</th>
            <th className="p-2">Κατάσταση</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{order.customer}</td>
              <td className="p-2">{order.date}</td>
              <td className="p-2">{order.total.toFixed(2)}</td>
              <td className="p-2">
                <span className={order.status === 'Εξοφλημένη' ? 'text-green-600' : 'text-red-600'}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
