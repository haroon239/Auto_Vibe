import React, { useEffect, useState } from 'react';
import { Trash2, Filter, Plus, User, Calendar, Eye } from 'lucide-react';
import api from '../../utils/axios';

const ITEMS_PER_PAGE = 6;

const statCards = [
  {
    label: 'TOTAL INVENTORY',
    key: 'total',
    prefix: '',
    sub: () => <span className="text-green-500 text-xs font-semibold">↑ +12% this month</span>,
  },
  {
    label: 'AVERAGE PRICE',
    key: 'avgPrice',
    prefix: '$',
    sub: () => <span className="text-gray-400 text-xs font-semibold">— Stable market</span>,
  },
  {
    label: 'PENDING INSPECTIONS',
    key: 'pending',
    prefix: '',
    sub: () => <span className="text-orange-500 text-xs font-semibold">! Requires Action</span>,
  },
  {
    label: 'ACTIVE LISTINGS',
    key: 'active',
    prefix: '',
    sub: () => <span className="text-blue-500 text-xs font-semibold">👁 8.2k Daily Views</span>,
  },
];

const getBadge = (i) => {
  const badges = ['NEW', 'CERTIFIED', null, 'EV', null, null];
  const colors = {
    NEW: 'bg-blue-600',
    CERTIFIED: 'bg-gray-800',
    EV: 'bg-gray-800',
  };
  const label = badges[i % badges.length];
  return label ? { label, color: colors[label] } : null;
};

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(1);
  const [search, setSearch]     = useState('');

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/getproducts');
      // ✅ backend returns { message, data: [...] } — unwrap it
      setProducts(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setProducts([]); // ✅ keep state as an array even on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/deleteproduct/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Filter by search — using actual schema field
  const filtered = products.filter(p =>
    (p.vehicleName || '').toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const avgPrice = products.length
    ? Math.round(products.reduce((sum, p) => sum + Number(p.vehiclePrice || 0), 0) / products.length)
    : 0;

  const stats = {
    total:    products.length,
    avgPrice: avgPrice.toLocaleString(),
    pending:  Math.floor(products.length * 0.03) || 0,
    active:   Math.floor(products.length * 0.71) || 0,
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, '...', totalPages);
    }
    return pages;
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
      Loading...
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0a1f5c]">Product Inventory</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage and monitor current vehicle listings across all regions.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-gray-300 transition-all">
            <Filter size={15} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all">
            <Plus size={15} />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 space-y-1">
            <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              {card.label}
            </p>
            <p className="text-2xl font-extrabold text-[#0a1f5c]">
              {card.prefix}{stats[card.key]}
            </p>
            {card.sub()}
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginated.map((p, i) => {
          const badge = getBadge((page - 1) * ITEMS_PER_PAGE + i);
          const imageUrl = p.image
            ? `http://localhost:6500/${p.image}`
            : 'https://via.placeholder.com/400x220?text=No+Image';

          return (
            <div key={p._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              {/* Image */}
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={p.vehicleName}
                  className="w-full h-48 object-cover"
                />
                {badge && (
                  <span className={`absolute top-3 right-3 ${badge.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider`}>
                    {badge.label}
                  </span>
                )}
                {p.condition && (
                  <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider">
                    {p.condition}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#0a1f5c] text-base">
                    {p.vehicleName}
                  </h3>
                  <span className="text-blue-600 font-bold text-sm">
                    ${Number(p.vehiclePrice || 0).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <User size={12} />
                    <span>{p.user?.username || p.user?.fullname || 'AutoVibe Seller'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Calendar size={12} />
                    <span>
                      Posted {p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : '—'}
                    </span>
                  </div>
                </div>

                <hr className="border-gray-100 mb-3" />

                <div className="flex items-center gap-2">
                  <button className="flex-1 text-sm font-semibold text-gray-600 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-all">
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-gray-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {paginated.length === 0 && (
          <div className="col-span-3 py-16 text-center text-gray-300 text-sm">
            No products found
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-400">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} results
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
  );
};

export default ProductsTable;
