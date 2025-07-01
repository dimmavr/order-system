import { useState } from 'react';

function NewPayment() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  
  // Dummy πελάτες
  const customers = [
    { id: 1, name: 'Γιώργος Παπαδόπουλος' },
    { id: 2, name: 'Μαρία Κωνσταντίνου' },
  ];

  // Dummy παραγγελίες ανά πελάτη
  const orders = [
    { id: 101, customerId: 1, label: 'Παραγγελία #101 - €500.00', total: 500 },
    { id: 102, customerId: 1, label: 'Παραγγελία #102 - €300.00', total: 300 },
    { id: 201, customerId: 2, label: 'Παραγγελία #201 - €150.00', total: 150 },
  ];

  // Παραγγελίες που ανήκουν στον επιλεγμένο πελάτη
  const filteredOrders = orders.filter(o => o.customerId.toString() === selectedCustomer);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer || !selectedOrder || !amount || !date) {
      alert('📌 Συμπλήρωσε όλα τα πεδία');
      return;
    }

    const payment = {
      customerId: selectedCustomer,
      orderId: selectedOrder,
      amount: parseFloat(amount),
      date,
    };

    console.log('💳 Πληρωμή προς καταχώρηση:', payment);
    alert('✅ Πληρωμή έτοιμη για αποστολή στο API!');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Νέα Πληρωμή</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-4">
        {/* Πελάτης */}
        <div>
          <label className="block text-sm font-medium">Επιλογή Πελάτη</label>
          <select
            value={selectedCustomer}
            onChange={(e) => {
              setSelectedCustomer(e.target.value);
              setSelectedOrder('');
            }}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Επιλέξτε --</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Παραγγελία */}
        {selectedCustomer && (
          <div>
            <label className="block text-sm font-medium">Επιλογή Παραγγελίας</label>
            <select
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Επιλέξτε --</option>
              {filteredOrders.map(o => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Ποσό */}
        <div>
          <label className="block text-sm font-medium">Ποσό (€)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Ημερομηνία */}
        <div>
          <label className="block text-sm font-medium">Ημερομηνία</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Καταχώρηση */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          💾 Καταχώρηση Πληρωμής
        </button>
      </form>
    </div>
  );
}

export default NewPayment;
