'use client';
import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle2, Truck, CreditCard } from 'lucide-react';

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<CheckoutStep>('address');
  const [shippingCost, setShippingCost] = useState(0);
  const [orderId, setOrderId] = useState('');
  
  const subtotal = getSubtotal();
  const total = subtotal + shippingCost;
  
  const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { 
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 
  }).format(price);

  const handleCompletePayment = () => {
    setOrderId(`PP-${Math.floor(100000 + Math.random() * 900000)}`);
    clearCart();
    setStep('confirmation');
  };

  if (step === 'confirmation') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-24 h-24 bg-[var(--color-mint)] rounded-full flex items-center justify-center mb-6 shadow-[var(--shadow-sticker)]">
          <CheckCircle2 className="w-12 h-12 text-[var(--color-mint-deep)]" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-[var(--color-cocoa)] mb-4">
          Yay! Pesananmu sudah kami terima.
        </h1>
        <p className="text-[var(--color-cocoa-70)] mb-2 max-w-md">
          Your order <strong>#{orderId}</strong> has been successfully placed. We've sent a confirmation via WhatsApp and Email.
        </p>
        <p className="text-[var(--color-cocoa-70)] mb-8 max-w-md">
          We will start producing your custom items right away!
        </p>
        <Button variant="primary" onClick={() => window.location.href = '/account'}>
          View My Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-heading font-bold text-[var(--color-cocoa)] mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[var(--color-border-warm)] -z-10 -translate-y-1/2" />
            
            {['address', 'shipping', 'payment'].map((s, i) => {
              const isActive = step === s;
              const isPast = ['address', 'shipping', 'payment'].indexOf(step) > i;
              return (
                <div key={s} className="flex flex-col items-center bg-[var(--color-cream)] px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 ${
                    isActive ? 'border-[var(--color-peach-deep)] bg-[var(--color-peach)] text-[var(--color-cocoa)]' :
                    isPast ? 'border-[var(--color-mint-deep)] bg-[var(--color-mint)] text-[var(--color-mint-deep)]' :
                    'border-[var(--color-border-warm)] bg-[var(--color-paper)] text-[var(--color-cocoa-70)]'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : (i + 1)}
                  </div>
                  <span className={`text-sm font-semibold capitalize ${isActive ? 'text-[var(--color-cocoa)]' : 'text-[var(--color-cocoa-70)]'}`}>
                    {s}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-[var(--color-paper)] p-8 rounded-[24px] border-[1.5px] border-[var(--color-border-warm)]">
            {step === 'address' && (
              <div className="flex flex-col gap-6 animate-in fade-in">
                <h2 className="font-heading font-bold text-xl text-[var(--color-cocoa)]">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="Budi" />
                  <Input label="Last Name" placeholder="Santoso" />
                  <Input label="Phone (WhatsApp)" placeholder="0812..." className="md:col-span-2" />
                  <Input label="Full Address" placeholder="Jl. Mawar No. 123..." className="md:col-span-2" />
                  
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm font-semibold text-[var(--color-cocoa)]">Province</label>
                    <select className="w-full px-4 py-3 bg-[var(--color-paper)] text-[var(--color-cocoa)] border-[1.5px] border-[var(--color-border-warm)] rounded-[16px] focus:outline-none focus:border-[var(--color-peach-deep)]">
                      <option>DKI Jakarta</option>
                      <option>Jawa Barat</option>
                      <option>Jawa Tengah</option>
                      <option>Jawa Timur</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm font-semibold text-[var(--color-cocoa)]">City / Regency</label>
                    <select className="w-full px-4 py-3 bg-[var(--color-paper)] text-[var(--color-cocoa)] border-[1.5px] border-[var(--color-border-warm)] rounded-[16px] focus:outline-none focus:border-[var(--color-peach-deep)]">
                      <option>Jakarta Selatan</option>
                      <option>Jakarta Pusat</option>
                    </select>
                  </div>
                </div>
                <Button variant="primary" className="mt-4 w-full md:w-auto self-end" onClick={() => setStep('shipping')}>
                  Continue to Shipping
                </Button>
              </div>
            )}

            {step === 'shipping' && (
              <div className="flex flex-col gap-6 animate-in fade-in">
                <h2 className="font-heading font-bold text-xl text-[var(--color-cocoa)]">Shipping Method</h2>
                <p className="text-sm text-[var(--color-cocoa-70)]">Calculated via Biteship / RajaOngkir</p>
                
                <div className="flex flex-col gap-4">
                  {[
                    { id: 'reg', name: 'JNE Reguler', time: '2-3 Hari', price: 15000 },
                    { id: 'yes', name: 'JNE YES', time: '1 Hari', price: 25000 },
                    { id: 'sameday', name: 'GoSend SameDay', time: 'Hari ini', price: 20000 },
                  ].map((courier) => (
                    <label key={courier.id} className={`flex items-center justify-between p-4 rounded-[16px] border-[1.5px] cursor-pointer transition-colors ${
                      shippingCost === courier.price ? 'border-[var(--color-peach-deep)] bg-[var(--color-peach-soft)]' : 'border-[var(--color-border-warm)] bg-[var(--color-cream)] hover:border-[var(--color-peach)]'
                    }`}>
                      <div className="flex items-center gap-4">
                        <input 
                          type="radio" 
                          name="shipping" 
                          value={courier.price}
                          checked={shippingCost === courier.price}
                          onChange={() => setShippingCost(courier.price)}
                          className="w-5 h-5 accent-[var(--color-peach-deep)]"
                        />
                        <div>
                          <p className="font-semibold text-[var(--color-cocoa)]">{courier.name}</p>
                          <p className="text-sm text-[var(--color-cocoa-70)]">Estimated arrival: {courier.time}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[var(--color-cocoa)]">{formatPrice(courier.price)}</span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="secondary" onClick={() => setStep('address')}>Back</Button>
                  <Button variant="primary" onClick={() => setStep('payment')} disabled={shippingCost === 0}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="flex flex-col gap-6 animate-in fade-in">
                <h2 className="font-heading font-bold text-xl text-[var(--color-cocoa)]">Payment Method</h2>
                <p className="text-sm text-[var(--color-cocoa-70)]">Powered securely by Midtrans / Xendit</p>
                
                <div className="flex flex-col gap-4">
                  <div className="p-6 border-[1.5px] border-[var(--color-border-warm)] rounded-[16px] bg-[var(--color-cream)] text-center">
                    <CreditCard className="w-10 h-10 mx-auto text-[var(--color-cocoa-70)] mb-3" />
                    <p className="font-semibold text-[var(--color-cocoa)] mb-2">Proceed to Midtrans Gateway</p>
                    <p className="text-sm text-[var(--color-cocoa-70)] mb-4">You will be redirected to complete your payment using QRIS, Virtual Account, or E-Wallet.</p>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="secondary" onClick={() => setStep('shipping')}>Back</Button>
                  <Button variant="primary" onClick={handleCompletePayment}>
                    Pay {formatPrice(total)}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[var(--color-paper)] p-6 rounded-[24px] border-[1.5px] border-[var(--color-border-warm)] sticky top-6">
            <h2 className="font-heading font-bold text-xl text-[var(--color-cocoa)] mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6 max-h-60 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-[var(--color-cream)] rounded-[12px] border-[1.5px] border-[var(--color-border-warm)] p-1 shrink-0">
                    <img src={item.designImageUrl} alt="Item" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-sm text-[var(--color-cocoa)] line-clamp-1">{item.productName}</p>
                    <p className="text-xs text-[var(--color-cocoa-70)]">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-[var(--color-peach-deep)]">{formatPrice(item.pricePerUnit * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t-[1.5px] border-[var(--color-border-warm)] pt-4 flex flex-col gap-2 mb-4 text-sm text-[var(--color-cocoa-70)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost > 0 ? formatPrice(shippingCost) : '-'}</span>
              </div>
            </div>
            
            <div className="border-t-[1.5px] border-[var(--color-border-warm)] pt-4">
              <div className="flex justify-between items-center">
                <span className="font-heading font-bold text-lg text-[var(--color-cocoa)]">Total</span>
                <span className="font-heading font-bold text-2xl text-[var(--color-peach-deep)]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
