import { useState } from 'react';

function PaymentList() {
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  // Dummy δεδομένα πληρωμών
  const payments = [
    { id: 1, customer: 'Γιώργος Παπαδόπουλος', email: 'gp@example.com', date: '2024-06-10', amount: 250 },
    { id: 2, customer: 'Μαρία Κωνσταντίνου', email: 'mk@example.com', date: '2024-06-12', amount: 300 },
    { id: 3, customer: 'Νίκος Αντωνίου', email: 'na@example.com', date: '2024-06-14', amount: 180 },
    { id: 4, customer: 'Γιώργος Παπαδόπουλος', email: 'gp@example.com', date: '2024-06-20', amount: 100 },
  ];

  const filtered = payments.filter(p => {
    const matchSearch =
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());

    const matchDate =
      (!dateFrom || p.date >= dateFrom) &&
      (!dateTo || p.date <= dateTo);

    const matchAmount =
      (minAmount === '' || p.amount >= parseFloat(minAmount)) &&
      (maxAmount === '' || p.amount <= parseFloat(maxAmount));

    return matchSearch && matchDate && matchAmount;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Αναζήτηση Πληρωμών</h1>

      {/* 🔎 Φίλτρα */}
      <div className="bg-white shadow rounded-xl p-4 mb-6 space-y-4">
        <input
          type="text"
          placeholder="Αναζήτηση πελάτη ή email"
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
      </div>

      {/* 📋 Λίστα */}
      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Πελάτης</th>
            <th className="p-2">Email</th>
            <th className="p-2">Ημερομηνία</th>
            <th className="p-2 text-right">Ποσό (€)</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.customer}</td>
              <td className="p-2">{p.email}</td>
              <td className="p-2">{p.date}</td>
              <td className="p-2 text-right">€{p.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentList;
