import { useState } from 'react';

function NewItem() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🆕 Νέο Είδος:', form);
    alert('✅ Είδος έτοιμο για αποστολή στο API!');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Νέο Είδος</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Όνομα</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Περιγραφή</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Τιμή (€)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          💾 Αποθήκευση
        </button>
      </form>
    </div>
  );
}

export default NewItem;
