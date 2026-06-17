import type {InvoiceData} from "@/app/types/InvoiceData";

export function generateInvoicePDF(invoice: InvoiceData) {
  const methodLabel: Record<string, string> = {
    card: "Cartão de Crédito/Débito",
    transfer: "Transferência Bancária",
    multicaixa: "Multicaixa Express",
  };

  const html = `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; color: #1a1a1a; background: #fff; padding: 40px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
        .logo { font-size: 22px; font-weight: 900; color: #1C6FD2; letter-spacing: -0.5px; }
        .logo span { color: #F97316; }
        .invoice-title { text-align: right; }
        .invoice-title h1 { font-size: 28px; font-weight: 900; color: #1C6FD2; }
        .invoice-title p { font-size: 13px; color: #666; margin-top: 4px; }
        .divider { height: 2px; background: linear-gradient(to right, #1C6FD2, #F97316); margin: 24px 0; border-radius: 2px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 32px; }
        .section h3 { font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .section p { font-size: 13px; color: #333; line-height: 1.8; }
        .section p strong { color: #1a1a1a; }
        .service-box { background: #f8f9fb; border-radius: 12px; padding: 20px; margin-bottom: 32px; border: 1px solid #e8eaf0; }
        .service-box h3 { font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .service-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px solid #eee; }
        .service-row:last-child { border-bottom: none; }
        .totals { margin-left: auto; width: 320px; }
        .total-row { display: flex; justify-content: space-between; font-size: 13px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
        .total-row.final { font-size: 16px; font-weight: 900; color: #1C6FD2; border-bottom: none; padding-top: 12px; }
        .badge { display: inline-block; background: #1C6FD215; color: #1C6FD2; border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: 700; }
        .footer { margin-top: 48px; text-align: center; font-size: 11px; color: #aaa; }
        .footer strong { color: #1C6FD2; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Uber<span>Services</span></div>
        <div class="invoice-title">
          <h1>FATURA</h1>
          <p><strong>${invoice.reference}</strong></p>
          <p>${new Date(invoice.issued_at).toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" })}</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="grid">
        <div class="section">
          <h3>Cliente</h3>
          <p><strong>${invoice.client.name}</strong></p>
          <p>${invoice.client.email}</p>
          <p>${invoice.client.phone ?? "—"}</p>
          <p>${invoice.client.address ?? "—"}</p>
        </div>
        <div class="section">
          <h3>Profissional</h3>
          <p><strong>${invoice.worker.name}</strong></p>
          <p>${invoice.worker.specialty ?? "—"}</p>
          <p>${invoice.worker.email}</p>
          <p>${invoice.worker.phone ?? "—"}</p>
        </div>
      </div>

      <div class="service-box">
        <h3>Detalhes do Serviço</h3>
        <div class="service-row">
          <span>Descrição</span>
          <span>${invoice.description}</span>
        </div>
        <div class="service-row">
          <span>Categoria</span>
          <span>${invoice.category_name ?? "—"}</span>
        </div>
        <div class="service-row">
          <span>Data agendada</span>
          <span>${invoice.scheduled_at ? new Date(invoice.scheduled_at).toLocaleString("pt-PT") : "—"}</span>
        </div>
        <div class="service-row">
          <span>Método de pagamento</span>
          <span>${methodLabel[invoice.method] ?? invoice.method}</span>
        </div>
      </div>

      <div class="totals">
        <div class="total-row">
          <span>Subtotal</span>
          <span>${Number(invoice.amount).toFixed(2)} Kz</span>
        </div>
        <div class="total-row">
          <span>Taxa de plataforma (2%)</span>
          <span>${Number(invoice.platform_fee).toFixed(2)} Kz</span>
        </div>
        <div class="total-row">
          <span>Ganhos do profissional</span>
          <span>${Number(invoice.worker_earnings).toFixed(2)} Kz</span>
        </div>
        <div class="total-row final">
          <span>Total pago</span>
          <span>${Number(invoice.amount).toFixed(2)} Kz</span>
        </div>
      </div>

      <div class="footer">
        <p>Obrigado por usar <strong>UberServices</strong> — Luanda, Angola</p>
        <p style="margin-top: 4px">Esta fatura foi gerada automaticamente e é válida sem assinatura.</p>
      </div>
    </body>
    </html>
  `;

  // Abre em nova aba e imprime como PDF
  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
    }, 500);
  }
}