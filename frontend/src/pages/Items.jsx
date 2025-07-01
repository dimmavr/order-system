import { useState } from 'react';

function Items() {
  const [items] = useState([
    { id: 1, name: 'Πόρτα Αλουμινίου', description: 'Ανθεκτική πόρτα εξωτερικού χώρου', price: 220.00 },
    { id: 2, name: 'Κάγκελο Σιδήρου', description: 'Μεταλλικό κάγκελο βαρέως τύπου', price: 85.50 },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Είδη</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Νέο Είδος
        </button>
      </div>

      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Όνομα</th>
            <th className="p-2">Περιγραφή</th>
            <th className="p-2">Τιμή (€)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.description}</td>
              <td className="p-2">{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Items;
