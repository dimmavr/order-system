import { useState } from 'react';

function OrderList() {
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [status, setStatus] = useState('');

  // Dummy παραγγελίες
  const orders = [
    { id: 1, customer: 'Γιώργος Παπαδόπουλος', date: '2024-06-01', amount: 500, status: 'paid' },
    { id: 2, customer: 'Μαρία Κωνσταντίνου', date: '2024-06-10', amount: 320, status: 'unpaid' },
    { id: 3, customer: 'Γιώργος Παπαδόπουλος', date: '2024-06-15', amount: 150, status: 'unpaid' },
    { id: 4, customer: 'Νίκος Αντωνίου', date: '2024-06-25', amount: 800, status: 'paid' },
  ];

  const filtered = orders.filter((o) => {
    const matchesSearch = o.customer.toLowerCase().includes(search.toLowerCase());
    const matchesDate =
      (!dateFrom || o.date >= dateFrom) && (!dateTo || o.date <= dateTo);
    const matchesAmount =
      (minAmount === '' || o.amount >= parseFloat(minAmount)) &&
      (maxAmount === '' || o.amount <= parseFloat(maxAmount));
    const matchesStatus = status === '' || o.status === status;

    return matchesSearch && matchesDate && matchesAmount && matchesStatus;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Αναζήτηση Παραγγελιών</h1>

      {/* 🔎 Φίλτρα */}
      <div className="bg-white shadow rounded-xl p-4 mb-6 space-y-4">
        <input
          type="text"
          placeholder="Αναζήτηση πελάτη"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Ελάχιστο ποσό"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Μέγιστο ποσό"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Όλες οι καταστάσεις --</option>
          <option value="paid">Εξοφλημένες</option>
          <option value="unpaid">Ανεξόφλητες</option>
        </select>
      </div>

      {/* 📋 Αποτελέσματα */}
      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Πελάτης</th>
            <th className="p-2">Ημερομηνία</th>
            <th className="p-2 text-right">Ποσό (€)</th>
            <th className="p-2 text-center">Κατάσταση</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.customer}</td>
              <td className="p-2">{o.date}</td>
              <td className="p-2 text-right">€{o.amount.toFixed(2)}</td>
              <td className="p-2 text-center">
                {o.status === 'paid' ? '✅' : '❌'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
