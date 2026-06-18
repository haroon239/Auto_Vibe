import React, { useEffect, useState } from 'react';
import { Trash2, UserPlus } from 'lucide-react';
import api from '../../utils/axios';

const statCards = [
  {
    label: 'TOTAL USERS',
    key: 'total',
    sub: ({ total }) => <span className="text-green-500 text-xs font-semibold">↑ 12% growth</span>,
  },
  {
    label: 'VERIFIED SELLERS',
    key: 'verified',
    sub: () => <span className="text-blue-500 text-xs font-semibold">✔ 98% compliance</span>,
  },
  {
    label: 'ACTIVE SESSIONS',
    key: 'sessions',
    sub: () => (
      <span className="bg-pink-100 text-pink-500 text-xs font-semibold px-3 py-0.5 rounded-full">
        Live now
      </span>
    ),
  },
  {
    label: 'AVG. ONBOARDING',
    key: 'onboarding',
    sub: () => <span className="text-red-400 text-xs font-semibold">↘ 2% faster</span>,
  },
];

const UsersTable = () => {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users/allusers');
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/deleteuser/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const stats = {
    total:      users.length,
    verified:   users.filter(u => u.isvarified).length,
    sessions:   users.filter(u => u.Payment).length,
    onboarding: '4.2 min',
  };

  // Avatar initials fallback
  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const avatarColors = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500',
    'bg-orange-500', 'bg-pink-500', 'bg-teal-500',
  ];

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
          <h2 className="text-2xl font-bold text-[#0a1f5c]">User Management</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Monitor and manage the AutoVibe marketplace user database.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all">
          <UserPlus size={16} />
          Invite New User
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 space-y-2">
            <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              {card.label}
            </p>
            <p className="text-2xl font-extrabold text-[#0a1f5c]">
              {stats[card.key]}
            </p>
            {card.sub(stats)}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr className="text-left text-[11px] font-bold text-gray-400 uppercase">
              <th className="px-5 py-4">Avatar</th>
              <th className="px-5 py-4">Full Name</th>
              <th className="px-5 py-4">Username</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Verified</th>
              <th className="px-5 py-4">Payment</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u, i) => (
              <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                {/* Avatar */}
                <td className="px-5 py-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${avatarColors[i % avatarColors.length]}`}>
                    {getInitials(u.fullname)}
                  </div>
                </td>

                {/* Full Name */}
                <td className="px-5 py-4 font-semibold text-[#0a1f5c]">
                  {u.fullname}
                </td>

                {/* Username */}
                <td className="px-5 py-4 text-gray-500">
                  @{u.username}
                </td>

                {/* Email */}
                <td className="px-5 py-4 text-gray-500">
                  {u.email}
                </td>

                {/* Verified */}
                <td className="px-5 py-4">
                  {u.isvarified ? (
                    <span className="text-green-600 border border-green-200 bg-green-50 text-xs font-semibold px-3 py-1 rounded-full">
                      Verified
                    </span>
                  ) : (
                    <span className="text-red-400 border border-red-200 bg-red-50 text-xs font-semibold px-2 py-1 rounded-full">
                      Not Verified
                    </span>
                  )}
                </td>

                {/* Payment */}
                <td className="px-5 py-4">
                  {u.Payment ? (
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-400 border border-gray-200 text-xs font-semibold px-3 py-1 rounded-full">
                      No
                    </span>
                  )}
                </td>

                {/* Delete */}
                <td className="px-5 py-4">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-300 text-sm">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
