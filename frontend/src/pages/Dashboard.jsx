function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-sm text-gray-500">Συνολικές Παραγγελίες</h2>
          <p className="text-2xl font-bold text-blue-600">135</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-sm text-gray-500">Συνολικό Ποσό Πωλήσεων</h2>
          <p className="text-2xl font-bold text-green-600">€23,500</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-sm text-gray-500">Ανεξόφλητα Ποσά</h2>
          <p className="text-2xl font-bold text-red-600">€4,200</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-sm text-gray-500">Top Είδος</h2>
          <p className="text-lg font-medium text-gray-800">Πόρτα Αλουμινίου</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
