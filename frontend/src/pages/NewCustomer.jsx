import { useState } from 'react';

function NewCustomer() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    tax_id: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🔄 Νέος πελάτης:', form);
    alert('✅ Πελάτης έτοιμος για αποστολή στο API!');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Νέος Πελάτης</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Όνομα</label>
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Επώνυμο</label>
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">ΑΦΜ</label>
          <input
            name="tax_id"
            value={form.tax_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Τηλέφωνο</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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

export default NewCustomer;
