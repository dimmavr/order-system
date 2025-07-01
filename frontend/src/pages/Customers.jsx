import { useState } from 'react';
import { Link } from 'react-router-dom';

function Customers() {
  const [customers] = useState([
    { id: 1, first_name: 'Γιώργος', last_name: 'Παπαδόπουλος', tax_id: '123456789', phone: '6971234567' },
    { id: 2, first_name: 'Μαρία', last_name: 'Κωνσταντίνου', tax_id: '987654321', phone: '6987654321' },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Πελάτες</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Νέος Πελάτης
        </button>
      </div>

      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Όνομα</th>
            <th className="p-2">Επώνυμο</th>
            <th className="p-2">ΑΦΜ</th>
            <th className="p-2">Τηλέφωνο</th>
            <th className="p-2 text-center">Καρτέλα</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{c.first_name}</td>
              <td className="p-2">{c.last_name}</td>
              <td className="p-2">{c.tax_id}</td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2 text-center">
                <Link
                  to={`/customers/card?id=${c.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Προβολή
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
