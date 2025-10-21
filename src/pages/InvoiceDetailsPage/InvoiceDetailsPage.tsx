// InvoiceDetailsPage.tsx (updated)
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  ChevronDown,
  Plus,
  Printer,
  Download,
  Mail,
  Trash2,
} from "lucide-react";

import { InvoiceData } from "@/types/Invoice";


import Loader from "@/components/Loader/Loader";
import "./InvoiceDetailsPage.css";
import { InvoiceService } from "@/services/api/invoice"; // NEW import - ensure path is correct
import { toast } from "react-toastify"; // optional for user feedback

// ... keep your interfaces InvoiceItem, InvoiceData as-is

const InvoiceDetailsPage: React.FC = () => {
  const location = useLocation();
  const params = useParams(); // optional: if you navigate with /invoice/:id
  const [paymentMethod, setPaymentMethod] = useState<
    "credit" | "upi" | "netbanking"
  >("credit");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: "INV-001",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    paymentStatus: "Pending",
    billTo: {
      name: "John",
      phone: "734 840 9981",
      address: "45th str",
    },
    items: [],
    subtotal: 0,
    tax: 0,
    grandTotal: 0,
  });

  // Helper to normalize backend booleans and formats to UI shape
  const normalizeInvoice = (data: any): InvoiceData => {
    return {
      invoiceNumber: data.invoiceNumber || data.invoice_number || "",
      date: data.date || "",
      dueDate: data.dueDate || data.due_date || "",
      paymentStatus:
        (data.paymentStatus || data.payment_status || "PENDING").toLowerCase() === "paid"
          ? "Paid"
          : (data.paymentStatus || data.payment_status || "PENDING").toLowerCase() === "overdue"
          ? "Overdue"
          : "Pending",
      billTo: {
        name: data.billTo?.name || data.bill_to_name || "",
        phone: data.billTo?.phone || data.bill_to_phone || "",
        address: data.billTo?.address || data.bill_to_address || "",
      },
      items:
        (data.items || []).map((it: any, idx: number) => ({
          id: it.id ?? idx + 1,
          itemNo: it.itemNo || it.item_no || `Item ${idx + 1}`,
          description: it.description || "",
          quantity: Number(it.quantity || 0),
          price: Number(it.price || 0),
          total: Number(it.total || 0),
        })) || [],
      subtotal: Number(data.subtotal || data.sub_total || data.subtotal || 0),
      tax: Number(data.tax || 0),
      grandTotal: Number(data.grandTotal || data.grand_total || 0),
    };
  };

  // Fetch invoice by reservation id (preferred) or by invoice id param
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);

        // If reservationData was passed via navigation state, fetch by reservation
        const reservationId = location.state?.reservationData?.id;
        let resp;
        if (reservationId) {
          resp = await InvoiceService.getByReservation(reservationId);
        } else if (params?.id) {
          resp = await InvoiceService.getById(Number(params.id));
        } else {
          // No reservation or id: keep current mock data
          setLoading(false);
          return;
        }

        if (resp && resp.data) {
          setInvoiceData((prev) => normalizeInvoice(resp.data));
        }
      } catch (err: any) {
        console.error("Error fetching invoice:", err);
        toast?.error?.("Failed to load invoice.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, params?.id]);

  // existing addNewItem/updateItem/deleteItem functions remain the same
  // ... (keep your addNewItem, updateItem, deleteItem implementations)

  // recalc totals locally when items change
  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
    const tax = Number((subtotal * 0.1).toFixed(2));
    const grandTotal = subtotal + tax;

    setInvoiceData((prev) => ({
      ...prev,
      subtotal,
      tax,
      grandTotal,
    }));
  };

  useEffect(() => {
    calculateTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceData.items]);

  // Save (update) invoice — this will call backend update (or create if needed)
  const handleSave = async () => {
    try {
      setLoading(true);
      // If invoice exists (has invoiceNumber/id) — ideally we have id in items
      // Try to find invoice id from location state or fetched data:
      const invoiceId = (location.state?.invoiceId) || (invoiceData as any).id;

      // Format body to match serializer mapping (backend expects billTo write_only + items with itemNo)
      const payload = {
        invoiceNumber: invoiceData.invoiceNumber,
        date: invoiceData.date,
        dueDate: invoiceData.dueDate,
        paymentStatus: invoiceData.paymentStatus.toUpperCase(),
        billTo: {
          name: invoiceData.billTo.name,
          phone: invoiceData.billTo.phone,
          address: invoiceData.billTo.address,
        },
        notes: "", // optional
        items: invoiceData.items.map((it) => ({
          itemNo: it.itemNo,
          description: it.description,
          quantity: it.quantity,
          price: it.price,
        })),
      };

      if (invoiceId) {
        await InvoiceService.update(invoiceId, payload);
        toast?.success?.("Invoice updated");
      } else {
        await InvoiceService.create(payload);
        toast?.success?.("Invoice created");
      }
    } catch (err) {
      console.error(err);
      toast?.error?.("Failed to save invoice");
    } finally {
      setLoading(false);
    }
  };

  // Mark as paid
  const handleMarkPaid = async () => {
    try {
      setLoading(true);
      const invoiceId = (location.state?.invoiceId) || (invoiceData as any).id;
      if (!invoiceId) {
        toast?.info?.("Invoice id not found");
        return;
      }
      await InvoiceService.markPaid(invoiceId);
      // reflect in UI
      setInvoiceData((prev) => ({ ...prev, paymentStatus: "Paid" }));
      toast?.success?.("Marked as paid");
    } catch (err) {
      console.error(err);
      toast?.error?.("Failed to mark paid");
    } finally {
      setLoading(false);
    }
  };

  const handleSendPaymentLink = async () => {
    try {
      setLoading(true);
      const invoiceId = (location.state?.invoiceId) || (invoiceData as any).id;
      if (!invoiceId) {
        toast?.info?.("Invoice id not found");
        return;
      }
      await InvoiceService.sendPaymentLink(invoiceId);
      toast?.success?.("Payment link sent (stub)");
    } catch (err) {
      console.error(err);
      toast?.error?.("Failed to send payment link");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Download as PDF (simple client-side print to PDF). If you implement server PDF endpoint, replace this.
  const handleDownload = () => {
    handlePrint(); // user can choose save as PDF in print dialog
  };

  // loader
  if (loading) {
    return <Loader fullScreen={true} variant="hotel" text="Loading Invoice..." />;
  }

  // ... keep your existing return JSX but replace the Save / Mark as paid / Send link buttons to call new handlers
  return (
    <div className="invoice-container">
      <div className="invoice-content">
        <div className="invoice-left-section">
          <div className="items-section">
            <h2 className="section-title">Items / Charges</h2>

            <button className="add-item-btn" onClick={() => {
              // your addNewItem function
              const newItem = {
                id: invoiceData.items.length + 1,
                itemNo: `Item ${invoiceData.items.length + 1}`,
                description: "",
                quantity: 1,
                price: 0,
                total: 0,
              };
              setInvoiceData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
            }}>
              <Plus size={16} />
              Add New item
            </button>

            <div className="items-table-container">
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Item no</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.itemNo}</td>
                      <td>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setInvoiceData(prev => ({
                              ...prev,
                              items: prev.items.map(it => it.id === item.id ? {...it, description: val} : it)
                            }))
                          }}
                          className="description-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const q = Number(e.target.value || 0);
                            setInvoiceData(prev => ({
                              ...prev,
                              items: prev.items.map(it => {
                                if (it.id === item.id) {
                                  const updated = {...it, quantity: q, total: Number((q * it.price).toFixed(2))};
                                  return updated;
                                }
                                return it;
                              })
                            }))
                          }}
                          className="qty-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            const p = Number(e.target.value || 0);
                            setInvoiceData(prev => ({
                              ...prev,
                              items: prev.items.map(it => {
                                if (it.id === item.id) {
                                  const updated = {...it, price: p, total: Number((p * it.quantity).toFixed(2))};
                                  return updated;
                                }
                                return it;
                              })
                            }))
                          }}
                          className="price-input"
                        />
                      </td>
                      <td className="total-cell">${item.total}</td>
                      <td>
                        <button
                          onClick={() => {
                            setInvoiceData(prev => ({ ...prev, items: prev.items.filter(it => it.id !== item.id) }));
                          }}
                          className="delete-btn"
                          title="Delete item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="totals-section">
              <div className="total-row">
                <span>Sub total</span>
                <span>${invoiceData.subtotal}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${invoiceData.tax}</span>
              </div>
              <div className="total-row grand-total">
                <span>Grand total</span>
                <span>${invoiceData.grandTotal}</span>
              </div>
            </div>

            <button className="save-btn" onClick={handleSave}>Save</button>

            <div className="payment-methods">
              {/* keep payment method radios */}
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-btn print-btn" onClick={handlePrint}>
              <Printer size={16} />
              Print
            </button>
            <button className="action-btn export-btn" onClick={handleDownload}>
              <Download size={16} />
              Export
            </button>
            <button className="action-btn mail-btn" onClick={handleSendPaymentLink}>
              <Mail size={16} />
              Send Mail
            </button>
          </div>
        </div>

        <div className="invoice-right-section">
          {/* KEEP your existing preview HTML --- mark paid button wired */}
          <div className="invoice-preview">
            {/* ... header / preview table ... */}
            <div className="invoice-actions">
              <button className="mark-paid-btn" onClick={handleMarkPaid}>Mark as paid</button>
              <button className="send-link-btn" onClick={handleSendPaymentLink}>Send payment link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;
