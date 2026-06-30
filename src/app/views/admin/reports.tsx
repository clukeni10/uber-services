import {
  Box, Flex, HStack, VStack, Text, Heading,
  Button, Spinner, Center, Badge,
} from "@chakra-ui/react";
import {
  LuFileText, LuDownload, LuFileSpreadsheet, LuUsers, LuBriefcase, LuWallet,
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import MobileMenuButton from "../components/mobile_menu_button";
import { blue, white } from "@/app/utils/COLORS";
import { useSidebar } from "@/app/context/SidebarContext";
import { useState } from "react";
import { getReportData } from "@/app/models/admin";

type ReportType = "payments" | "services" | "workers";

const reports = [
  {
    type: "payments" as ReportType,
    title: "Relatório de Pagamentos",
    desc: "Todos os pagamentos com detalhes de cliente, worker, valor, taxa e método.",
    icon: LuWallet,
    color: blue,
    fields: ["Referência", "Cliente", "Profissional", "Especialidade", "Categoria", "Valor", "Taxa", "Ganho Worker", "Método", "Estado", "Data"],
  },
  {
    type: "services" as ReportType,
    title: "Relatório de Serviços",
    desc: "Todos os serviços com estado, datas, cliente, worker e valor pago.",
    icon: LuBriefcase,
    color: "#8B5CF6",
    fields: ["ID", "Descrição", "Cliente", "Profissional", "Categoria", "Estado", "Valor", "Data Agendada", "Data Início", "Data Conclusão"],
  },
  {
    type: "workers" as ReportType,
    title: "Relatório de Profissionais",
    desc: "Performance de todos os workers — ganhos, serviços, avaliação e preço/hora.",
    icon: LuUsers,
    color: "#10B981",
    fields: ["Nome", "Email", "Especialidade", "Cidade", "Preço/Hora", "Avaliação", "Ganhos Totais", "Total Serviços", "Concluídos"],
  },
];

export default function AdminReports() {
  const { sidebarW } = useSidebar();
  const [loadingType, setLoadingType] = useState<ReportType | null>(null);

  async function exportToCSV(type: ReportType) {
    setLoadingType(type);
    try {
      const data = await getReportData(type);
      if (!data || data.length === 0) return;

      const headers = Object.keys(data[0]);
      const rows = data.map((row: any) =>
        headers.map((h) => {
          const val = row[h];
          if (val === null || val === undefined) return "";
          if (typeof val === "string" && val.includes(",")) return `"${val}"`;
          return val;
        }).join(",")
      );

      const csv = [headers.join(","), ...rows].join("\n");
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `worke_${type}_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoadingType(null);
    }
  }

  async function exportToPDF(type: ReportType) {
    setLoadingType(type);
    try {
      const data = await getReportData(type);
      if (!data || data.length === 0) return;

      const report = reports.find(r => r.type === type)!;
      const headers = Object.keys(data[0]);
      const now = new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" });

      const rows = data.slice(0, 100).map((row: any) =>
        `<tr>${headers.map(h => `<td>${row[h] ?? "—"}</td>`).join("")}</tr>`
      ).join("");

      const html = `
        <!DOCTYPE html>
        <html lang="pt">
        <head>
          <meta charset="UTF-8" />
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 24px; color: #1a1a1a; font-size: 11px; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
            .logo { font-size: 18px; font-weight: 900; color: #1C6FD2; }
            .logo span { color: #F97316; }
            .title h1 { font-size: 16px; font-weight: 800; color: #1C6FD2; }
            .title p { font-size: 10px; color: #888; margin-top: 2px; }
            .divider { height: 2px; background: linear-gradient(to right, #1C6FD2, #F97316); margin: 16px 0; }
            table { width: 100%; border-collapse: collapse; }
            th { background: #1C6FD2; color: white; padding: 6px 8px; text-align: left; font-size: 9px; text-transform: uppercase; }
            td { padding: 5px 8px; border-bottom: 1px solid #f0f0f0; font-size: 9px; color: #333; }
            tr:nth-child(even) td { background: #f8f9fb; }
            .footer { margin-top: 24px; text-align: center; font-size: 9px; color: #aaa; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Workê</div>
            <div class="title">
              <h1>${report.title}</h1>
              <p>Gerado em ${now} · ${data.length} registos</p>
            </div>
          </div>
          <div class="divider"></div>
          <table>
            <thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="footer">Workê — Plataforma de Serviços · Luanda, Angola</div>
        </body>
        </html>
      `;

      const win = window.open("", "_blank");
      if (win) {
        win.document.write(html);
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 500);
      }
    } finally {
      setLoadingType(null);
    }
  }

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      <Sidebar />
      <MobileMenuButton />

      <Box w="100%" flex="1" ml={{ base: "0", md: sidebarW }} transition="margin 0.25s ease" overflow="auto">

        <Box bg={blue} w="100%" px={{ base: 4, md: 10 }} py={10} position="relative" overflow="hidden">
          <Box position="absolute" inset="0" opacity={0.08}
            backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
            backgroundSize="32px 32px" />
          <Box maxW="1100px" mx="auto" position="relative">
            <Heading color={white} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" mb={1}>
              Relatórios
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Exporta dados da plataforma em CSV ou PDF.
            </Text>
          </Box>
        </Box>

        <Box maxW="1100px" mx="auto" px="6" py="8">
          <VStack gap="5" align="stretch">
            {reports.map((report) => {
              const Icon = report.icon;
              const isLoading = loadingType === report.type;
              return (
                <Box key={report.type} bg={white} borderRadius="2xl" border="1px solid"
                  borderColor="gray.100" p="6" shadow="sm" transition="all 0.2s"
                  _hover={{ shadow: "md", borderColor: report.color }}>
                  <HStack justify="space-between" align="flex-start" flexWrap="wrap" gap="4">
                    <HStack gap="4" flex="1">
                      <Flex w="52px" h="52px" borderRadius="xl" bg={`${report.color}15`}
                        color={report.color} alignItems="center" justifyContent="center" flexShrink={0}>
                        <Icon size={22} />
                      </Flex>
                      <VStack align="flex-start" gap="1" flex="1">
                        <Text fontWeight="bold" fontSize="md" color="gray.800">{report.title}</Text>
                        <Text fontSize="xs" color="gray.500">{report.desc}</Text>
                        <HStack gap="2" flexWrap="wrap" mt="1">
                          {report.fields.map(f => (
                            <Badge key={f} bg="gray.100" color="gray.500" borderRadius="full"
                              px="2" fontSize="9px">
                              {f}
                            </Badge>
                          ))}
                        </HStack>
                      </VStack>
                    </HStack>

                    <VStack gap="2" flexShrink={0}>
                      <Button
                        size="sm" bg={report.color} color={white} borderRadius="xl" w="full"
                        _hover={{ opacity: 0.9 }}
                        loading={isLoading}
                        onClick={() => exportToPDF(report.type)}
                      >
                        <HStack gap="2">
                          <LuFileText size={14} />
                          <Text fontSize="xs">Exportar PDF</Text>
                        </HStack>
                      </Button>
                      <Button
                        size="sm" variant="outline" borderRadius="xl" w="full"
                        borderColor={report.color} color={report.color}
                        _hover={{ bg: `${report.color}10` }}
                        loading={isLoading}
                        onClick={() => exportToCSV(report.type)}
                      >
                        <HStack gap="2">
                          <LuFileSpreadsheet size={14} />
                          <Text fontSize="xs">Exportar CSV</Text>
                        </HStack>
                      </Button>
                    </VStack>
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}