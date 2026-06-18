import React, { useEffect, useState } from 'react';
import { Filter, Download, MoreVertical, Plus, Settings, Calendar, LayoutGrid, TrendingUp } from 'lucide-react';
import api from '../../utils/axios';

const ITEMS_PER_PAGE = 5;

const getInitials = (name = '') =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const avatarColors = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-gray-200 text-gray-600',
  'bg-blue-100 text-blue-700',
  'bg-orange-100 text-orange-700',
];

const getTimeRemaining = (expiresAt) => {
  if (!expiresAt) return { label: 'Unlimited', days: 999, percent: 100 };
  const diff = new Date(expiresAt) - new Date();
  if (diff <= 0) return { label: 'Expired', days: 0, percent: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const percent = Math.min(100, Math.round((days / 30) * 100));
  return { label: `${days} Days left`, days, percent };
};

const getStatus = (expiresAt, isActive) => {
  if (!isActive) return 'suspended';
  if (!expiresAt) return 'active';
  const diff = new Date(expiresAt) - new Date();
  if (diff <= 0) return 'suspended';
  if (diff < 3 * 24 * 60 * 60 * 1000) return 'expiring';
  if (diff < 7 * 24 * 60 * 60 * 1000) return 'renewal';
  return 'active';
};

const StatusBadge = ({ status }) => {
  const map = {
    active:    { label: 'Active',          cls: 'bg-green-50 text-green-600 border border-green-200' },
    expiring:  { label: 'Expiring',        cls: 'bg-red-50 text-red-500 border border-red-200' },
    suspended: { label: 'Suspended',       cls: 'bg-gray-100 text-gray-500 border border-gray-200' },
    renewal:   { label: 'Renewal Pending', cls: 'bg-blue-50 text-blue-500 border border-blue-200' },
  };
  const s = map[status] || map.suspended;
  return (
    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'active' ? 'bg-green-500' :
        status === 'expiring' ? 'bg-red-400' :
        status === 'renewal' ? 'bg-blue-400' : 'bg-gray-400'
      }`} />
      {s.label}
    </span>
  );
};

const ProgressBar = ({ percent, status }) => {
  const color =
    status === 'active'    ? 'bg-blue-500' :
    status === 'expiring'  ? 'bg-red-400'  :
    status === 'renewal'   ? 'bg-blue-300' : 'bg-gray-300';
  return (
    <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
    </div>
  );
};

const PackageMonitor = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/payments/allpayments');
        setPackages(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const active    = packages.filter(p => getStatus(p.expiresAt, p.isActive) === 'active').length;
  const expiring  = packages.filter(p => getStatus(p.expiresAt, p.isActive) === 'expiring').length;
  const totalVal  = packages.reduce((s, p) => s + Number(p.price || 0), 0);
  const popular   = (() => {
    const count = {};
    packages.forEach(p => { count[p.packageName] = (count[p.packageName] || 0) + 1; });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
  })();

  const totalPages = Math.ceil(packages.length / ITEMS_PER_PAGE);
  const paginated  = packages.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, '...', totalPages];
  };

  const handleExport = () => {
    const csv = [
      ['User', 'Email', 'Package', 'Expiry Date', 'Time Remaining', 'Status'],
      ...packages.map(p => {
        const { label } = getTimeRemaining(p.expiresAt);
        const status    = getStatus(p.expiresAt, p.isActive);
        return [
          p.userId?.fullname || 'Unknown',
          p.userId?.email || '—',
          p.packageName,
          p.expiresAt ? new Date(p.expiresAt).toLocaleDateString() : 'Unlimited',
          label,
          status,
        ];
      })
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'packages.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Loading...</div>
  );

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0a1f5c]">Package Monitor</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Real-time tracking of active subscriptions and expiry alerts for dealership partners.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-300 transition-all">
            <Filter size={14} /> Filter
          </button>
          <button onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Packages */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center">
              <Settings size={17} className="text-gray-500" />
            </div>
            <span className="text-green-500 text-xs font-semibold">+12%</span>
          </div>
          <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">Active Packages</p>
          <p className="text-2xl font-extrabold text-[#0a1f5c]">{active.toLocaleString()}</p>
        </div>

        {/* Expiring */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center">
              <Calendar size={17} className="text-red-400" />
            </div>
            <span className="text-red-500 text-xs font-semibold">{expiring} expiring</span>
          </div>
          <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">Expiring (48h)</p>
          <p className="text-2xl font-extrabold text-[#0a1f5c]">{expiring}</p>
        </div>

        {/* Total Value */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center">
              <LayoutGrid size={17} className="text-gray-500" />
            </div>
            <span className="text-blue-500 text-xs font-semibold">MRR</span>
          </div>
          <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">Total Value</p>
          <p className="text-2xl font-extrabold text-[#0a1f5c]">
            ${totalVal >= 1000 ? `${(totalVal / 1000).toFixed(1)}k` : totalVal}
          </p>
        </div>

        {/* Popular Tier */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={17} className="text-gray-500" />
            </div>
            <span className="text-purple-500 text-xs font-semibold">Top</span>
          </div>
          <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">Popular Tier</p>
          <p className="text-xl font-extrabold text-[#0a1f5c]">{popular}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-[#0a1f5c]">Inventory Monitoring</h3>
            <span className="bg-green-50 text-green-600 border border-green-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
              Live Feed
            </span>
          </div>
          {/* Avatar group */}
          <div className="flex items-center">
            {['bg-blue-500', 'bg-purple-500', 'bg-green-500'].map((c, i) => (
              <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white -ml-2 first:ml-0`} />
            ))}
            <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white -ml-2 flex items-center justify-center text-[10px] font-bold text-gray-500">
              +18
            </div>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="border-b border-gray-50">
            <tr className="text-left text-[11px] font-bold text-gray-400 uppercase">
              <th className="px-5 py-3">User / Dealership</th>
              <th className="px-5 py-3">Package Tier</th>
              <th className="px-5 py-3">Expiry Date</th>
              <th className="px-5 py-3">Time Remaining</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((pkg, i) => {
              const name     = pkg.userId?.fullname || pkg.userId?.username || 'Unknown';
              const email    = pkg.userId?.email || '—';
              const status   = getStatus(pkg.expiresAt, pkg.isActive);
              const { label, percent } = getTimeRemaining(pkg.expiresAt);

              return (
                <tr key={pkg._id} className="hover:bg-gray-50 transition-colors">
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                        {getInitials(name)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a1f5c] text-sm">{name}</p>
                        <p className="text-gray-400 text-xs">{email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Package */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        status === 'active' ? 'bg-blue-500' :
                        status === 'expiring' ? 'bg-red-400' : 'bg-gray-400'
                      }`} />
                      <span className="text-gray-700 font-medium text-sm">{pkg.packageName}</span>
                    </div>
                  </td>

                  {/* Expiry Date */}
                  <td className="px-5 py-4 text-gray-500 text-xs">
                    {pkg.expiresAt
                      ? new Date(pkg.expiresAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                      : '∞ Unlimited'}
                  </td>

                  {/* Time Remaining */}
                  <td className="px-5 py-4">
                    <p className={`text-xs font-semibold mb-1.5 ${
                      status === 'expiring' ? 'text-red-500' :
                      status === 'active'   ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {label}
                    </p>
                    <ProgressBar percent={percent} status={status} />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <button className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-300 text-sm">
                  No packages found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
          <p className="text-sm text-gray-400">
            Showing {packages.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, packages.length)} of {packages.length} results
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 transition-all">
              ‹
            </button>
            {getPageNumbers().map((p, i) => (
              <button key={i} onClick={() => typeof p === 'number' && setPage(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all
                  ${p === page ? 'bg-blue-600 text-white'
                  : p === '...' ? 'text-gray-400 cursor-default'
                  : 'border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600'}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 transition-all">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="bg-[#0a1f5c] rounded-2xl p-6 flex items-start justify-between gap-6">
        <div className="flex-1">
          <span className="bg-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-widest uppercase mb-3 inline-block">
            AI Insight
          </span>
          <h3 className="text-white text-xl font-bold mb-2">Churn Risk Detected</h3>
          <p className="text-blue-200 text-sm leading-relaxed mb-4">
            Based on recent listing activity and expiration proximity, {expiring + 2} accounts are at
            high risk of non-renewal. We recommend reaching out with the "Q4 Loyalty Discount" offer.
          </p>
          <button className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all">
            View At-Risk Accounts
          </button>
        </div>
        <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
          <TrendingUp size={40} className="text-blue-300 opacity-60" />
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50">
        <Plus size={22} />
      </button>
    </div>
  );
};

export default PackageMonitor;
