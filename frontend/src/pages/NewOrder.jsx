import { useState } from 'react';

function NewOrder() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'Πόρτα Αλουμινίου', price: 220, quantity: 0 },
    { id: 2, name: 'Κάγκελο Σιδήρου', price: 85.5, quantity: 0 },
    { id: 3, name: 'Σίτα Παραθύρου', price: 45, quantity: 0 },
  ]);

  const [customers] = useState([
    { id: 1, name: 'Γιώργος Παπαδόπουλος' },
    { id: 2, name: 'Μαρία Κωνσταντίνου' },
  ]);

  const handleQuantityChange = (id, qty) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: parseInt(qty) || 0 } : item
    ));
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedItems = items.filter(i => i.quantity > 0);
    if (!selectedCustomer || selectedItems.length === 0) {
      alert('📌 Συμπλήρωσε πελάτη και τουλάχιστον ένα είδος');
      return;
    }

    const order = {
      customer: selectedCustomer,
      items: selectedItems,
      total,
    };

    console.log('🧾 Παραγγελία προς καταχώρηση:', order);
    alert('✅ Παραγγελία έτοιμη για αποστολή στο API!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Νέα Παραγγελία</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-6">

        {/* Επιλογή Πελάτη */}
        <div>
          <label className="block text-sm font-medium">Επιλογή Πελάτη</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Επιλέξτε --</option>
            {customers.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Επιλογή Ειδών */}
        <div>
          <label className="block text-sm font-medium mb-2">Επιλέξτε Είδη & Ποσότητες</label>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between border p-2 rounded">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">€{item.price.toFixed(2)}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-20 border p-1 rounded text-right"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Προεπισκόπηση Παραγγελίας</h2>
          <ul className="mb-2">
            {items.filter(i => i.quantity > 0).map(item => (
              <li key={item.id}>
                {item.quantity} × {item.name} = €{(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold">Σύνολο: €{total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          💾 Καταχώρηση Παραγγελίας
        </button>
      </form>
    </div>
  );
}

export default NewOrder;
