import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Filler, Tooltip,
} from 'chart.js';
import { Users, Car, Package, TrendingUp } from 'lucide-react';
import api from '../../utils/axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const MONTHLY_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ── Stat Card ──────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, change, changeType, iconBg, iconColor }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
        <Icon size={18} className={iconColor} />
      </div>
      <span className={`text-xs font-semibold ${changeType === 'up' ? 'text-green-500' : changeType === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
        {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '—'} {change}
      </span>
    </div>
    <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">{label}</p>
    <p className="text-2xl font-extrabold text-[#0a1f5c]">{value}</p>
  </div>
);

// ── Overview ───────────────────────────────────────────────
const Overview = () => {
  const [stats, setStats]               = useState({ users: 0, products: 0, packages: 0 });
  const [recentUsers, setRecentUsers]   = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [chartRange, setChartRange]     = useState('6');
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          api.get('/users/allusers'),
          api.get('/products/getproducts'),
        ]);

        const users    = usersRes.data || [];
        const products = productsRes.data?.data || [];   // ✅ unwrap { message, data: [...] }

        setStats({
          users:    users.length,
          products: products.length,
          packages: users.filter(u => u.Payment === true).length,
        });

        setRecentUsers(users.slice(-5).reverse());
        setRecentProducts(products.slice(-5).reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Dummy monthly data for chart
  const allMonths  = [12000, 18000, 15000, 22000, 19000, 27000, 31000, 28000, 34000, 29000, 38000, 42000];
  const labels     = chartRange === '6' ? MONTHLY_LABELS.slice(6) : MONTHLY_LABELS;
  const chartData  = chartRange === '6' ? allMonths.slice(6) : allMonths;

  const lineData = {
    labels,
    datasets: [{
      label: 'Revenue',
      data: chartData,
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37,99,235,0.08)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#2563eb',
      fill: true,
      tension: 0.4,
    }],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
      y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af', callback: v => `$${(v/1000).toFixed(0)}k` } },
    },
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0a1f5c]">Overview</h2>
        <p className="text-sm text-gray-400 mt-0.5">Performance metrics and platform health summary.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}    label="Total Users"     value={stats.users.toLocaleString()}    change="12%" changeType="up"   iconBg="bg-blue-50"   iconColor="text-blue-600" />
        <StatCard icon={Car}      label="Total Products"  value={stats.products.toLocaleString()} change="5%"  changeType="up"   iconBg="bg-green-50"  iconColor="text-green-600" />
        <StatCard icon={TrendingUp} label="Total Revenue" value="$452,000"                        change="18%" changeType="up"   iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard icon={Package}  label="Active Packages" value={stats.packages.toLocaleString()} change="0%"  changeType="none" iconBg="bg-orange-50" iconColor="text-orange-500" />
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-[#0a1f5c]">Revenue Trends</h3>
            <p className="text-xs text-gray-400 mt-0.5">Monthly breakdown of gross platform revenue</p>
          </div>
          <div className="flex gap-2">
            {['6', '12'].map(r => (
              <button key={r} onClick={() => setChartRange(r)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all
                  ${chartRange === r ? 'bg-[#0a1f5c] text-white' : 'border border-gray-200 text-gray-500 hover:border-blue-400'}`}>
                {r === '6' ? '6 Months' : '1 Year'}
              </button>
            ))}
          </div>
        </div>
        <div className="h-56">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Recent Users + Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Users */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0a1f5c]">Recent Users</h3>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-bold text-gray-400 uppercase border-b border-gray-50">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Verified</th>
                <th className="pb-2">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentUsers.map((u, i) => (
                <tr key={i} className="text-gray-700">
                  <td className="py-2.5 font-medium text-[#0a1f5c]">{u.fullname}</td>
                  <td className="py-2.5 text-xs text-gray-400 truncate max-w-[120px]">{u.email}</td>
                  <td className="py-2.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.isvarified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                      {u.isvarified ? 'YES' : 'NO'}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.Payment ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                      {u.Payment ? 'PAID' : 'FREE'}
                    </span>
                  </td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr><td colSpan={4} className="py-6 text-center text-gray-300 text-xs">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Products */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0a1f5c]">Recent Products</h3>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Manage All</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-bold text-gray-400 uppercase border-b border-gray-50">
                <th className="pb-2">Image</th>
                <th className="pb-2">Title</th>
                <th className="pb-2">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentProducts.map((p, i) => (
                <tr key={i} className="text-gray-700">
                  <td className="py-2.5">
                    <img
                      src={p.image ? p.image : 'https://via.placeholder.com/40x30?text=Car'}
                      alt={p.vehicleName}
                      className="w-12 h-8 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2.5 font-medium text-[#0a1f5c] truncate max-w-[120px]">{p.vehicleName}</td>
                  <td className="py-2.5 font-semibold text-gray-700">${Number(p.vehiclePrice || 0).toLocaleString()}</td>
                </tr>
              ))}
              {recentProducts.length === 0 && (
                <tr><td colSpan={3} className="py-6 text-center text-gray-300 text-xs">No products found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
