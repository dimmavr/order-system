import { useState } from 'react';

function CustomerList() {
  const [search, setSearch] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [status, setStatus] = useState('');

  // Dummy δεδομένα πελατών + συνολικό υπόλοιπο
  const customers = [
    { id: 1, name: 'Γιώργος Παπαδόπουλος', tax_id: '123456789', phone: '6940000000', email: 'gp@example.com', debt: 450, status: 'unpaid' },
    { id: 2, name: 'Μαρία Κωνσταντίνου', tax_id: '987654321', phone: '6941111111', email: 'mk@example.com', debt: 0, status: 'paid' },
    { id: 3, name: 'Νίκος Αντωνίου', tax_id: '111122233', phone: '6932222222', email: 'na@example.com', debt: 180, status: 'unpaid' },
  ];

  // Φιλτράρισμα
  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.tax_id.includes(search) ||
      c.phone.includes(search);

    const matchesAmount =
      (minAmount === '' || c.debt >= parseFloat(minAmount)) &&
      (maxAmount === '' || c.debt <= parseFloat(maxAmount));

    const matchesStatus =
      status === '' || c.status === status;

    return matchesSearch && matchesAmount && matchesStatus;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Αναζήτηση Πελατών</h1>

      {/* 🔎 Αναζήτηση + Φίλτρα */}
      <div className="bg-white shadow rounded-xl p-4 mb-6 space-y-4">
        <input
          type="text"
          placeholder="Αναζήτηση (όνομα, email, ΑΦΜ, τηλ)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />

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
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Όνομα</th>
            <th className="p-2">ΑΦΜ</th>
            <th className="p-2">Υπόλοιπο (€)</th>
            <th className="p-2">Κατάσταση</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.tax_id}</td>
              <td className="p-2 text-right">€{c.debt.toFixed(2)}</td>
              <td className="p-2 text-center">
                {c.status === 'paid' ? '✅' : '❌'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
