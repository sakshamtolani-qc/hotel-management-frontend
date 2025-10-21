// src/services/api/invoice.ts
import axios from "axios";
// src/services/api/invoice.ts
// import { InvoiceData } from "../../pages/Invoice/InvoiceDetailsPage"; 


const API = axios.create({
  baseURL: "/api/billing", // your backend prefix
  // headers etc. If you use auth token, add interceptor or set headers here
});

export const InvoiceService = {
  list: (params?: any) => API.get("/invoices/", { params }),
  getById: (id: number) => API.get(`/invoices/${id}/`),
  getByReservation: (reservationId: number) =>
    API.get(`/invoices/by-reservation/${reservationId}/`),
  markPaid: (id: number) => API.patch(`/invoices/${id}/mark-paid/`, {}),
  create: (payload: any) => API.post("/invoices/", payload),
  update: (id: number, payload: any) => API.put(`/invoices/${id}/`, payload),
  sendPaymentLink: (id: number) => API.get(`/invoices/${id}/send-payment-link/`),
  // If you implement a PDF endpoint, you can add:
  // downloadPdf: (id: number) => API.get(`/invoices/${id}/download/`, { responseType: 'blob' })
};
