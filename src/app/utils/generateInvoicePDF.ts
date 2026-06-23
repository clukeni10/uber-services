import type { InvoiceData } from "@/app/types/InvoiceData";

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
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0E1B2D; background: #F8FAFC; padding: 50px; line-height: 1.5; }
        
        /* Topo da Fatura */
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
        .logo { font-size: 26px; font-weight: 800; color: #0E1B2D; letter-spacing: -0.5px; }
        .logo span { color: #3E84D9; }
        
        .invoice-title { text-align: right; }
        .invoice-title h1 { font-size: 24px; font-weight: 800; color: #0E1B2D; letter-spacing: 1px; }
        .invoice-title p { font-size: 13px; color: #4F46E5; font-weight: 600; margin-top: 4px; }
        .invoice-date { font-size: 12px; color: #64748B; margin-top: 2px; }
        
        /* Linha Divisória Executiva */
        .divider { height: 3px; background: #0E1B2D; margin: 20px 0 35px 0; border-radius: 2px; }
        
        /* Grid de Envolvidos */
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .section { background: #FFFFFF; padding: 20px; border-radius: 8px; border: 1px solid #E2E8F0; }
        .section h3 { font-size: 11px; font-weight: 700; color: #3E84D9; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #F1F5F9; padding-bottom: 6px; }
        .section p { font-size: 13px; color: #0E1B2D; line-height: 1.6; }
        .section p strong { color: #0E1B2D; font-weight: 700; }
        
        /* Tabela Detalhada de Serviços */
        .table-container { background: #FFFFFF; border-radius: 8px; border: 1px solid #E2E8F0; overflow: hidden; margin-bottom: 35px; }
        .table-container h3 { font-size: 11px; font-weight: 700; color: #0E1B2D; text-transform: uppercase; letter-spacing: 1px; padding: 16px 20px 0 20px; }
        
        .invoice-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .invoice-table th { background: #F8FAFC; text-align: left; padding: 12px 20px; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; border-bottom: 1px solid #E2E8F0; }
        .invoice-table td { padding: 14px 20px; font-size: 13px; color: #0E1B2D; border-bottom: 1px solid #F1F5F9; }
        .invoice-table tr:last-child td { border-bottom: none; }
        .text-right { text-align: right; }
        
        /* Resumo de Valores */
        .totals-wrapper { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px; }
        .payment-method-box { background: #FFFFFF; border: 1px solid #E2E8F0; padding: 15px 20px; border-radius: 8px; width: 40%; font-size: 12px; color: #64748B; }
        .payment-method-box strong { color: #0E1B2D; display: block; margin-bottom: 4px; font-size: 13px; }
        
        .totals { width: 45%; }
        .total-row { display: flex; justify-content: space-between; font-size: 13px; padding: 8px 10px; color: #64748B; }
        .total-row.final { font-size: 16px; font-weight: 800; color: #FFFFFF; background: #0E1B2D; border-radius: 6px; padding: 12px 15px; margin-top: 10px; }
        .total-row.final span { color: #FFFFFF; }
        
        /* Rodapé Fixo */
        .footer { margin-top: 70px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 20px; }
        .footer strong { color: #115FBF; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Workê<span>.</span></div>
        <div class="invoice-title">
          <h1>FATURA</h1>
          <p>${invoice.reference}</p>
          <div class="invoice-date">${new Date(invoice.issued_at).toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" })}</div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="grid">
        <div class="section">
          <h3>Cliente</h3>
          <p><strong>${invoice.client.name}</strong></p>
          <p>${invoice.client.email}</p>
          <p>${invoice.client.phone ? 'Tel: ' + invoice.client.phone : "—"}</p>
          <p>${invoice.client.address ?? "—"}</p>
        </div>
        <div class="section">
          <h3>Profissional / Prestador</h3>
          <p><strong>${invoice.worker.name}</strong></p>
          <p style="color: #4F46E5; font-weight: 600; font-size: 12px;">${invoice.worker.specialty ?? "Prestador de Serviços"}</p>
          <p>${invoice.worker.email}</p>
          <p>${invoice.worker.phone ? 'Tel: ' + invoice.worker.phone : "—"}</p>
        </div>
      </div>

      <div class="table-container">
        <h3>Especificação dos Serviços</h3>
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Descrição do Serviço</th>
              <th>Categoria</th>
              <th class="text-right">Data de Execução</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${invoice.description}</strong></td>
              <td>${invoice.category_name ?? "Geral"}</td>
              <td class="text-right">${invoice.scheduled_at ? new Date(invoice.scheduled_at).toLocaleString("pt-PT") : "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="totals-wrapper">
        <div class="payment-method-box">
          <strong>Forma de Pagamento</strong>
          ${methodLabel[invoice.method] ?? invoice.method}
        </div>
        
        <div class="totals">
          <div class="total-row">
            <span>Subtotal Bruto</span>
            <span>${Number(invoice.amount).toFixed(2)} Kz</span>
          </div>
          <div class="total-row">
            <span>Taxa Operacional Intermediação (2%)</span>
            <span>${Number(invoice.platform_fee).toFixed(2)} Kz</span>
          </div>
          <div class="total-row">
            <span>Retenção/Ganhos Líquidos</span>
            <span>${Number(invoice.worker_earnings).toFixed(2)} Kz</span>
          </div>
          <div class="total-row final">
            <span>Total Liquido Pago</span>
            <span>${Number(invoice.amount).toFixed(2)} Kz</span>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>Documento emitido de forma eletrónica pela plataforma <strong>Workê</strong> — Luanda, Angola</p>
        <p style="margin-top: 4px; color: #94A3B8;">Este documento serve de comprovativo fiscal de transação e liquidação financeira interna.</p>
      </div>
    </body>
    </html>
  `;

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