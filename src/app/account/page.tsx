'use client';
import React, { useState } from 'react';
import { Package, Heart, Camera, MapPin, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

type TabId = 'orders' | 'designs' | 'photobooth' | 'addresses' | 'profile';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabId>('orders');
  
  const tabs = [
    { id: 'orders', label: 'My Orders', icon: <Package className="w-5 h-5" /> },
    { id: 'designs', label: 'Saved Designs', icon: <Heart className="w-5 h-5" /> },
    { id: 'photobooth', label: 'Photobooth Gallery', icon: <Camera className="w-5 h-5" /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile Settings', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-6 mb-10">
        <div className="w-20 h-20 bg-[var(--color-peach-soft)] rounded-full flex items-center justify-center text-3xl font-heading font-bold text-[var(--color-peach-deep)] border-4 border-white shadow-sm">
          A
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-[var(--color-cocoa)]">Ayu Lestari</h1>
          <p className="text-[var(--color-cocoa-70)]">ayu.lestari@example.com</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex items-center gap-3 px-4 py-3 rounded-[16px] font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--color-peach-soft)] text-[var(--color-cocoa)]'
                  : 'text-[var(--color-cocoa-70)] hover:bg-[var(--color-cream)] hover:text-[var(--color-cocoa)]'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-[var(--color-peach-deep)]' : ''}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
          
          <button className="flex items-center gap-3 px-4 py-3 mt-4 rounded-[16px] font-semibold text-[var(--color-berry)] hover:bg-[var(--color-cream)] transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-grow bg-[var(--color-paper)] p-6 md:p-8 rounded-[24px] border-[1.5px] border-[var(--color-border-warm)] shadow-sm min-h-[500px]">
          {activeTab === 'orders' && (
            <div className="animate-in fade-in">
              <h2 className="font-heading font-bold text-2xl text-[var(--color-cocoa)] mb-6">My Orders</h2>
              
              <div className="flex flex-col gap-4">
                {/* Mock Order Card */}
                <div className="border-[1.5px] border-[var(--color-border-warm)] rounded-[16px] p-5 bg-[var(--color-cream)]">
                  <div className="flex flex-wrap justify-between items-center mb-4 gap-4 border-b-[1.5px] border-[var(--color-border-warm)] pb-4">
                    <div>
                      <p className="text-sm text-[var(--color-cocoa-70)]">Order ID</p>
                      <p className="font-semibold font-mono text-[var(--color-cocoa)]">#PP-847291</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--color-cocoa-70)]">Date</p>
                      <p className="font-semibold text-[var(--color-cocoa)]">Oct 6, 2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--color-cocoa-70)]">Total</p>
                      <p className="font-semibold text-[var(--color-peach-deep)]">Rp 60.000</p>
                    </div>
                    <div>
                      <Badge variant="new">In Production</Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-[var(--color-paper)] rounded-[12px] border-[1.5px] border-[var(--color-border-warm)] shrink-0 flex items-center justify-center p-1">
                      <div className="w-full h-full bg-[var(--color-peach-soft)] rounded-[8px]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-cocoa)]">Custom Button Pin</p>
                      <p className="text-sm text-[var(--color-cocoa-70)]">32mm • Round • Glossy • Qty: 10</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="secondary" size="sm">Track Package</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'orders' && (
            <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in py-20">
              <div className="w-20 h-20 bg-[var(--color-cream)] rounded-full flex items-center justify-center mb-4">
                {tabs.find(t => t.id === activeTab)?.icon}
              </div>
              <h2 className="font-heading font-bold text-2xl text-[var(--color-cocoa)] mb-2">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-[var(--color-cocoa-70)] max-w-sm">
                This section is currently empty. Start creating designs or updating your profile to see content here!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
