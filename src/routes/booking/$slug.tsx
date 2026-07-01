import React, { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Printer, Download, Plane, Building2, User, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const Route = createFileRoute("/booking/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, customers(*)')
      .eq('booking_ref', params.slug)
      .single();

    if (error) throw error;
    return data;
  },
  component: BookingInvoice,
});

function BookingInvoice() {
  const data = Route.useLoaderData();
  const customer = data.customers || {};
  const invoiceRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    pdf.save(`Invoice_${data.booking_ref}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col print:bg-white">
      
      <main className="flex-1 max-w-[850px] mx-auto px-4 py-10 w-full print:p-0">
        <div className="flex justify-end gap-3 mb-6 print:hidden">
          <button onClick={() => window.print()} className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <Printer className="h-4 w-4" /> Print
          </button>
          <button onClick={downloadPDF} className="px-4 py-2 text-sm font-medium bg-[#1a103c] text-white rounded shadow-sm hover:bg-[#2a1b54] flex items-center gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>

        {/* Invoice Paper Document */}
        <div ref={invoiceRef} className="bg-white p-12 min-h-[900px] shadow-sm border border-slate-200 print:border-none print:shadow-none">
          
          {/* Company & Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-2xl font-bold text-[#1a103c]">MALLICK TRAVELS</h1>
              <p className="text-slate-500 text-sm mt-1">Official Invoice & Booking Summary</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase">Invoice Ref</p>
              <p className="text-lg font-semibold text-[#1a103c]">{data.booking_ref}</p>
              <p className="text-xs font-medium text-slate-500 mt-2">{new Date(data.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Customer & Contact Section */}
          <div className="grid grid-cols-2 gap-8 mb-12 border-b border-slate-200 pb-8">
            <div>
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Billed To</h3>
              <p className="text-md font-semibold text-slate-800">{customer.name}</p>
              {customer.company && <p className="text-sm text-slate-600">{customer.company}</p>}
              <p className="text-sm text-slate-600 mt-1 flex items-start gap-1.5"><MapPin className="h-4 w-4 shrink-0" /> {customer.address || "Address not provided"}</p>
            </div>
            <div className="text-right">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Contact Details</h3>
              <p className="text-sm text-slate-600 flex items-center justify-end gap-2 mb-1.5"><Mail className="h-3.5 w-3.5" /> {customer.email || "N/A"}</p>
              <p className="text-sm text-slate-600 flex items-center justify-end gap-2"><Phone className="h-3.5 w-3.5" /> {customer.phone || "N/A"}</p>
            </div>
          </div>

          {/* Cost Breakdown Table */}
          <table className="w-full mb-12 border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Service Description</th>
                <th className="text-center py-3 px-4 text-xs font-bold text-slate-500 uppercase">Pax</th>
                <th className="text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-5 px-4">
                  <div className="flex items-center gap-3">
                    {data.booking_type === 'flight' ? <Plane className="h-5 w-5 text-slate-400" /> : <Building2 className="h-5 w-5 text-slate-400" />}
                    <div>
                      <p className="font-medium text-slate-800 capitalize">{data.booking_type} Booking</p>
                      <p className="text-xs text-slate-500 mt-0.5">{data.notes || "Standard Package"}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-4 text-center text-slate-700 font-medium">{data.travellers}</td>
                <td className="py-5 px-4 text-right font-medium text-slate-800">₹{data.total_amount}</td>
              </tr>
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="flex justify-end mb-16">
            <div className="w-72">
              <div className="flex justify-between py-2 text-sm text-slate-600">
                <span>Total Base Fare</span>
                <span>₹{data.total_amount}</span>
              </div>
              <div className="flex justify-between py-2 text-sm text-slate-600 border-b border-slate-200">
                <span>Tax (Included)</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-lg font-bold text-[#1a103c]">Grand Total</span>
                <span className="text-2xl font-bold text-[#1a103c]">₹{data.total_amount}</span>
              </div>
            </div>
          </div>

          {/* Footer Footer */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">Payment Status: <span className="font-semibold text-slate-600 uppercase">{data.payment_status}</span></p>
            <p className="text-[10px] text-slate-300 mt-3 uppercase tracking-widest">System Generated Invoice - No Signature Required</p>
          </div>
        </div>
      </main>
    </div>
  );
}
