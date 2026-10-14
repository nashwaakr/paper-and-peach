'use client';
import React, { useState } from 'react';
import { Package, Image as ImageIcon, Users, Settings, Search, Edit, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

type AdminTab = 'orders' | 'assets' | 'customers' | 'settings';
type OrderStatus = 'Awaiting Payment' | 'Processing' | 'In Production' | 'Shipped' | 'Completed';

interface Order {
  id: string;
  date: string;
  customer: string;
  status: OrderStatus;
  total: number;
  resi: string;
}

const mockOrders: Order[] = [
  { id: 'PP-847291', date: '2026-10-06', customer: 'Ayu Lestari', status: 'In Production', total: 60000, resi: '' },
  { id: 'PP-921345', date: '2026-10-05', customer: 'Budi Santoso', status: 'Awaiting Payment', total: 125000, resi: '' },
  { id: 'PP-774212', date: '2026-10-04', customer: 'Citra Kirana', status: 'Processing', total: 45000, resi: '' },
  { id: 'PP-665123', date: '2026-10-03', customer: 'Dewi Ayu', status: 'Shipped', total: 85000, resi: 'JP0912384752' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { 
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 
  }).format(price);

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Awaiting Payment': return 'secondary';
      case 'Processing': return 'primary';
      case 'In Production': return 'new';
      case 'Shipped': return 'primary'; // Mint deep representation later
      case 'Completed': return 'sale'; // Mint representation
      default: return 'primary';
    }
  };

  const generateResi = (orderId: string) => {
    const resi = `JP${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    setOrders(orders.map(o => o.id === orderId ? { ...o, resi, status: 'Shipped' } : o));
  };

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="flex h-screen bg-[var(--color-cream)]">
      {/* Admin Sidebar */}
      <div className="w-64 bg-[var(--color-paper)] border-r-[1.5px] border-[var(--color-border-warm)] p-6 flex flex-col h-full overflow-y-auto">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-full bg-[var(--color-peach-deep)]" />
          <span className="font-heading font-bold text-xl text-[var(--color-cocoa)]">Admin Panel</span>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {[
            { id: 'orders', label: 'Orders', icon: <Package className="w-5 h-5" /> },
            { id: 'assets', label: 'Studio Assets', icon: <ImageIcon className="w-5 h-5" /> },
            { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
            { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--color-peach-soft)] text-[var(--color-peach-deep)]'
                  : 'text-[var(--color-cocoa-70)] hover:bg-[var(--color-cream)] hover:text-[var(--color-cocoa)]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 overflow-y-auto">
        {activeTab === 'orders' && (
          <div className="animate-in fade-in">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-heading font-bold text-3xl text-[var(--color-cocoa)]">Orders Management</h1>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-cocoa-70)]" />
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  className="w-full pl-9 pr-4 py-2 rounded-full border-[1.5px] border-[var(--color-border-warm)] bg-[var(--color-paper)] focus:outline-none focus:border-[var(--color-peach-deep)]"
                />
              </div>
            </div>

            <div className="bg-[var(--color-paper)] rounded-[24px] border-[1.5px] border-[var(--color-border-warm)] overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[var(--color-cream)] border-b-[1.5px] border-[var(--color-border-warm)]">
                  <tr>
                    <th className="p-4 font-semibold text-[var(--color-cocoa-70)]">Order ID</th>
                    <th className="p-4 font-semibold text-[var(--color-cocoa-70)]">Date</th>
                    <th className="p-4 font-semibold text-[var(--color-cocoa-70)]">Customer</th>
                    <th className="p-4 font-semibold text-[var(--color-cocoa-70)]">Total</th>
                    <th className="p-4 font-semibold text-[var(--color-cocoa-70)]">Status</th>
                    <th className="p-4 font-semibold text-[var(--color-cocoa-70)]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-[1.5px] divide-[var(--color-border-warm)]">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-[var(--color-cream)] transition-colors">
                      <td className="p-4 font-mono font-semibold text-[var(--color-cocoa)]">{order.id}</td>
                      <td className="p-4 text-[var(--color-cocoa-70)]">{order.date}</td>
                      <td className="p-4 text-[var(--color-cocoa)] font-medium">{order.customer}</td>
                      <td className="p-4 font-semibold text-[var(--color-peach-deep)]">{formatPrice(order.total)}</td>
                      <td className="p-4">
                        <select 
                          value={order.status} 
                          onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-transparent border-none text-sm font-semibold outline-none cursor-pointer"
                          style={{
                            color: order.status === 'Shipped' || order.status === 'Completed' ? 'var(--color-mint-deep)' : 
                                   order.status === 'In Production' ? 'var(--color-peach-deep)' : 'var(--color-cocoa-70)'
                          }}
                        >
                          <option value="Awaiting Payment">Awaiting Payment</option>
                          <option value="Processing">Processing</option>
                          <option value="In Production">In Production</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-4">
                        {order.status === 'In Production' || order.status === 'Processing' ? (
                          <Button size="sm" variant="primary" onClick={() => generateResi(order.id)}>
                            Gen AWB
                          </Button>
                        ) : order.resi ? (
                          <span className="font-mono text-sm text-[var(--color-cocoa-70)]">{order.resi}</span>
                        ) : (
                          <span className="text-sm text-[var(--color-cocoa-70)]">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="animate-in fade-in">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-heading font-bold text-3xl text-[var(--color-cocoa)]">Studio Assets</h1>
              <Button variant="primary" className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload New Asset
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Asset Cards */}
              {[
                { name: 'Peach Sparkles', type: 'Sticker', url: 'https://placehold.co/150x150/FFF6EC/FF9A85' },
                { name: 'Retro Grid', type: 'Background', url: 'https://placehold.co/150x150/E5F7F1/4A2C2A' },
                { name: 'Cute Frog', type: 'Sticker', url: 'https://placehold.co/150x150/FFF6EC/4A2C2A' },
                { name: 'Y2K Stars', type: 'Sticker', url: 'https://placehold.co/150x150/FEF6DF/FF9A85' },
              ].map((asset, i) => (
                <div key={i} className="bg-[var(--color-paper)] p-4 rounded-[20px] border-[1.5px] border-[var(--color-border-warm)] group">
                  <div className="aspect-square bg-[var(--color-cream)] rounded-[12px] mb-4 flex items-center justify-center p-4 relative overflow-hidden">
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover rounded-[8px]" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[var(--color-cocoa)] hover:scale-110 transition-transform">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-cocoa)]">{asset.name}</h3>
                    <p className="text-sm text-[var(--color-cocoa-70)]">{asset.type}</p>
                  </div>
                </div>
              ))}
              
              {/* Add New Slot */}
              <button className="bg-[var(--color-cream)] p-4 rounded-[20px] border-2 border-dashed border-[var(--color-border-warm)] hover:border-[var(--color-peach-deep)] transition-colors flex flex-col items-center justify-center min-h-[250px] text-[var(--color-cocoa-70)] hover:text-[var(--color-peach-deep)]">
                <Plus className="w-8 h-8 mb-2" />
                <span className="font-semibold">Add New Category</span>
              </button>
            </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {(activeTab === 'customers' || activeTab === 'settings') && (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <Settings className="w-16 h-16 text-[var(--color-border-warm)] mb-4" />
            <h2 className="font-heading font-bold text-2xl text-[var(--color-cocoa)] mb-2 capitalize">{activeTab}</h2>
            <p className="text-[var(--color-cocoa-70)] max-w-sm">This module is under construction.</p>
          </div>
        )}
      </div>
    </div>
  );
}
