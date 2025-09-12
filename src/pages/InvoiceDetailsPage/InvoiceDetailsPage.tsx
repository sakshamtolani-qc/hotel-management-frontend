import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ChevronDown,
  Plus,
  Printer,
  Download,
  Mail,
  Trash2,
} from "lucide-react";

import Loader from "@/components/Loader/Loader";
import "./InvoiceDetailsPage.css";

interface InvoiceItem {
  id: number;
  itemNo: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  paymentStatus: "Pending" | "Paid" | "Overdue";
  billTo: {
    name: string;
    phone: string;
    address: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  grandTotal: number;
}

const InvoiceDetailsPage: React.FC = () => {
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<
    "credit" | "upi" | "netbanking"
  >("credit");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loader state

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
    items: [
      {
        id: 1,
        itemNo: "Item 1",
        description: "Room Service",
        quantity: 1,
        price: 100,
        total: 100,
      },
      {
        id: 2,
        itemNo: "Item 2",
        description: "Drinks",
        quantity: 3,
        price: 300,
        total: 300,
      },
      {
        id: 3,
        itemNo: "Item 3",
        description: "Food",
        quantity: 4,
        price: 450,
        total: 450,
      },
    ],
    subtotal: 1200,
    tax: 20,
    grandTotal: 1220,
  });

  // ✅ Simulate API/data loading and handle navigation state
  useEffect(() => {
    // Check if we have reservation data from navigation
    if (location.state?.reservationData) {
      const { reservationData, roomData } = location.state;
      
      // Update invoice data with reservation information
      setInvoiceData(prev => ({
        ...prev,
        invoiceNumber: `INV-${reservationData.id}`,
        billTo: {
          name: reservationData.name,
          phone: reservationData.phoneNumber,
          address: reservationData.email,
        },
        items: [
          {
            id: 1,
            itemNo: "ROOM-001",
            description: roomData?.title || "Room Booking",
            quantity: 1,
            price: reservationData.price || 1000,
            total: reservationData.price || 1000,
          }
        ]
      }));
    }
    
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [location.state]);

  const addNewItem = () => {
    const newItem: InvoiceItem = {
      id: invoiceData.items.length + 1,
      itemNo: `Item ${invoiceData.items.length + 1}`,
      description: "",
      quantity: 1,
      price: 0,
      total: 0,
    };
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateItem = (
    id: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "price") {
            updatedItem.total = updatedItem.quantity * updatedItem.price;
          }
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  const deleteItem = (id: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const updatePaymentStatus = (status: "Pending" | "Paid" | "Overdue") => {
    setInvoiceData((prev) => ({
      ...prev,
      paymentStatus: status,
    }));
    setShowStatusDropdown(false);
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
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
  }, [invoiceData.items]);

  // ✅ Show loader until loading is false
  if (loading) {
    return (
      <Loader fullScreen={true} variant="hotel" text="Loading Invoice..." />
    );
  }

  return (
    <div className="invoice-container">
      <div className="invoice-content">
        <div className="invoice-left-section">
          <div className="items-section">
            <h2 className="section-title">Items / Charges</h2>

            <button className="add-item-btn" onClick={addNewItem}>
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
                          onChange={(e) =>
                            updateItem(item.id, "description", e.target.value)
                          }
                          className="description-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                          className="qty-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "price",
                              parseInt(e.target.value)
                            )
                          }
                          className="price-input"
                        />
                      </td>
                      <td className="total-cell">${item.total}</td>
                      <td>
                        <button
                          onClick={() => deleteItem(item.id)}
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

            <button className="save-btn">Save</button>

            <div className="payment-methods">
              <div className="payment-option">
                <input
                  type="radio"
                  id="credit"
                  name="payment"
                  checked={paymentMethod === "credit"}
                  onChange={() => setPaymentMethod("credit")}
                />
                <label htmlFor="credit">Credit Card</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  id="upi"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                <label htmlFor="upi">UPI</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  id="netbanking"
                  name="payment"
                  checked={paymentMethod === "netbanking"}
                  onChange={() => setPaymentMethod("netbanking")}
                />
                <label htmlFor="netbanking">Net Banking</label>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-btn print-btn">
              <Printer size={16} />
              Print
            </button>
            <button className="action-btn export-btn">
              <Download size={16} />
              Export
            </button>
            <button className="action-btn mail-btn">
              <Mail size={16} />
              Send Mail
            </button>
          </div>
        </div>

        <div className="invoice-right-section">
          <div className="invoice-preview">
            <div className="invoice-header">
              <div className="company-logo">
                <img src="/logo.png" alt="Quorum Consulting" className="logo" />
              </div>
              <div className="invoice-meta">
                <div className="meta-item">
                  <span className="meta-label">Invoice Number</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Date</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Due Date</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Payment Status</span>
                  <div
                    className="status-dropdown"
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  >
                    <span
                      className={`status-${invoiceData.paymentStatus.toLowerCase()}`}
                    >
                      {invoiceData.paymentStatus}
                    </span>

                    <ChevronDown size={16} />
                    {showStatusDropdown && (
                      <div className="status-dropdown-menu">
                        <div
                          className="status-option"
                          onClick={() => updatePaymentStatus("Pending")}
                        >
                          Pending
                        </div>
                        <div
                          className="status-option"
                          onClick={() => updatePaymentStatus("Paid")}
                        >
                          Paid
                        </div>
                        <div
                          className="status-option"
                          onClick={() => updatePaymentStatus("Overdue")}
                        >
                          Overdue
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <h2 className="preview-title">Invoice Preview</h2>
            <div className="company-details">
              <p>
                <strong>Address:</strong> xxxx
              </p>
              <p>
                <strong>Contact:</strong> yyyy
              </p>
            </div>

            <div className="bill-to-section">
              <h3>Bill To</h3>
              <p className="customer-name">{invoiceData.billTo.name}</p>
              <p className="customer-phone">{invoiceData.billTo.phone}</p>
              <p className="customer-address">{invoiceData.billTo.address}</p>
            </div>

            <div className="preview-table-container">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>Item no</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.itemNo}</td>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="preview-totals">
              <div className="preview-total-row">
                <span>Sub total</span>
                <span>${invoiceData.subtotal}</span>
              </div>
              <div className="preview-total-row">
                <span>Tax</span>
                <span>${invoiceData.tax}</span>
              </div>
              <div className="preview-total-row grand-total">
                <span>Grand total</span>
                <span>${invoiceData.grandTotal}</span>
              </div>
            </div>

            <div className="invoice-actions">
              <button className="mark-paid-btn">Mark as paid</button>
              <button className="send-link-btn">Send payment link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;
