import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import api from '../../utils/axios';

const ITEMS_PER_PAGE = 8;

const getInitials = (name = '') =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const avatarColors = [
  'bg-blue-600', 'bg-blue-400', 'bg-gray-500',
  'bg-blue-700', 'bg-purple-500', 'bg-teal-500',
];

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: '2-digit', year: 'numeric'
  });
};

const getStatus = (expiresAt, isActive) => {
  if (!isActive) return 'inactive';
  if (!expiresAt) return 'active'; // unlimited
  return new Date() > new Date(expiresAt) ? 'expired' : 'active';
};

const StatusBadge = ({ status }) => {
  const map = {
    active:   'bg-green-50 text-green-600 border border-green-200',
    expired:  'bg-red-50 text-red-500 border border-red-200',
    inactive: 'bg-gray-100 text-gray-400',
  };
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${map[status] || map.inactive}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const PackageBadge = ({ name }) => (
  <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-3 py-1 rounded-full">
    {name}
  </span>
);

const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(1);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get('/payments/allpayments');
        setPayments(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.price || p.Revenue || 0), 0);
  const totalPages   = Math.ceil(payments.length / ITEMS_PER_PAGE);
  const paginated    = payments.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, '...', totalPages];
  };

  const handleExport = () => {
    const csv = [
      ['User', 'Email', 'Package', 'Price', 'Purchase Date', 'Expiry Date', 'Status'],
      ...payments.map(p => [
        p.userId?.fullname || 'Unknown',
        p.userId?.email || '—',
        p.packageName,
        `$${p.price}`,
        formatDate(p.purchasedAt),
        p.expiresAt ? formatDate(p.expiresAt) : 'Unlimited',
        getStatus(p.expiresAt, p.isActive),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'payments.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Loading...</div>
  );

  return (
    <div className="space-y-5">

      {/* Fiscal Overview Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0a1f5c] px-8 py-10 min-h-[160px] flex flex-col justify-center">
        {/* Background chart image effect */}
        <div className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(135deg, #0a1f5c 40%, #1e40af 100%)',
          }}
        />
        {/* Decorative right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30"
          style={{
            background: 'linear-gradient(135deg, transparent, #3b82f6)',
          }}
        />
        <div className="relative z-10">
          <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-2">
            Fiscal Overview
          </p>
          <h2 className="text-white text-4xl font-extrabold tracking-tight mb-3">
            Total Revenue: ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center gap-2">
            <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              ↑ +12.5%
            </span>
            <span className="text-blue-200 text-sm">vs last quarter</span>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0a1f5c] text-base">Transaction History</h3>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr className="text-left text-[11px] font-bold text-gray-400 uppercase">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Package Name</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Purchase Date</th>
              <th className="px-5 py-3">Expiry Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((p, i) => {
              const status   = getStatus(p.expiresAt, p.isActive);
              const name     = p.userId?.fullname || p.userId?.username || 'Unknown';
              const email    = p.userId?.email || '—';
              const colorIdx = i % avatarColors.length;

              return (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarColors[colorIdx]}`}>
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
                    <PackageBadge name={p.packageName} />
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 font-semibold text-gray-700">
                    ${Number(p.price || 0).toFixed(2)}
                  </td>

                  {/* Purchase Date */}
                  <td className="px-5 py-4 text-gray-500 text-xs">
                    {formatDate(p.purchasedAt)}
                  </td>

                  {/* Expiry Date */}
                  <td className="px-5 py-4 text-gray-500 text-xs">
                    {p.expiresAt ? formatDate(p.expiresAt) : '∞ Unlimited'}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={status} />
                  </td>
                </tr>
              );
            })}

            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-300 text-sm">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
            <p className="text-sm text-gray-400">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, payments.length)} of {payments.length} entries
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 transition-all"
              >
                ‹
              </button>
              {getPageNumbers().map((p, i) => (
                <button
                  key={i}
                  onClick={() => typeof p === 'number' && setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all
                    ${p === page
                      ? 'bg-blue-600 text-white'
                      : p === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                    }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 transition-all"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsTable;
