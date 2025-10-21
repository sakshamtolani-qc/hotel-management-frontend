// src/types/Invoice.ts

export interface InvoiceItem {
  id?: number;
  itemNo: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceData {
  id?: number;
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
