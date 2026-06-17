import {
  Box, Flex, VStack, HStack, Text, Button,
  Input, Dialog, Portal, Field, Spinner,
} from "@chakra-ui/react";
import {
  LuCreditCard, LuBanknote, LuSmartphone,
  LuCircle, LuX, LuDownload,
} from "react-icons/lu";
import { useState } from "react";
import { usePayment } from "@/app/controllers/usePayment";
import { generateInvoicePDF } from "@/app/utils/generateInvoicePDF";
import { blue, white } from "@/app/utils/COLORS";

type Method = "card" | "transfer" | "multicaixa";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: number;
  amount: number;
  workerName: string;
  onSuccess: () => void;
}

const methods = [
  { id: "card"       as Method, label: "Cartão",            desc: "Crédito ou débito", icon: LuCreditCard, color: blue       },
  { id: "transfer"   as Method, label: "Transferência",     desc: "Bancária",           icon: LuBanknote,   color: "#10B981"  },
  { id: "multicaixa" as Method, label: "Multicaixa Express",desc: "Via telefone",        icon: LuSmartphone, color: "#F97316"  },
];

export default function PaymentModal({
  isOpen, onClose, serviceId, amount, workerName, onSuccess,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<Method>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const { handlePayment, loading, error, success, reference, invoiceData } = usePayment();

  async function onPay() {
    const extra: { card_last4?: string; phone?: string } = {};
    if (selectedMethod === "card") extra.card_last4 = cardNumber.replace(/\s/g, "").slice(-4);
    if (selectedMethod === "multicaixa") extra.phone = phone;

    // NÃO chama onSuccess aqui — deixa o modal mostrar o ecrã de sucesso
    await handlePayment(serviceId, selectedMethod, extra);
  }

  function handleClose() {
    onClose();
    // Só chama onSuccess quando o utilizador fecha manualmente após ver o sucesso
    if (success) onSuccess();
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && handleClose()} size={{ mdDown: "full", md: "md" }}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" p="4">
            <Dialog.Header pb="2">
              <HStack justify="space-between" w="full">
                <Dialog.Title fontSize="lg" fontWeight="bold" color="gray.800">
                  {success ? "Pagamento confirmado" : "Pagamento"}
                </Dialog.Title>
                {!loading && !success && (
                  <Box cursor="pointer" color="gray.400" _hover={{ color: "gray.600" }} onClick={handleClose}>
                    <LuX size={18} />
                  </Box>
                )}
              </HStack>
            </Dialog.Header>

            <Dialog.Body py="4" px="2">

              {/* Ecrã de sucesso */}
              {success ? (
                <VStack gap="4" py="6">
                  <Flex
                    w="64px" h="64px" borderRadius="full"
                    bg="#10B98115" color="#10B981"
                    alignItems="center" justifyContent="center"
                  >
                    <LuCircle size={32} />
                  </Flex>

                  <VStack gap="1" textAlign="center">
                    <Text fontWeight="bold" fontSize="lg" color="gray.800">
                      Pagamento efetuado!
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      O teu pedido foi enviado para {workerName}.
                    </Text>
                    {reference && (
                      <Box bg="gray.50" borderRadius="xl" px="4" py="2" mt="2" w="full">
                        <Text fontSize="xs" color="gray.400">Referência</Text>
                        <Text fontWeight="bold" color={blue} fontSize="sm">{reference}</Text>
                      </Box>
                    )}
                  </VStack>

                  <VStack gap="2" w="full">
                    {invoiceData && (
                      <Button
                        w="full" variant="outline" borderRadius="xl"
                        borderColor={blue} color={blue}
                        _hover={{ bg: `${blue}10` }}
                        onClick={() => generateInvoicePDF(invoiceData)}
                      >
                        <HStack gap="2">
                          <LuDownload size={16} />
                          <Text>Descarregar fatura</Text>
                        </HStack>
                      </Button>
                    )}
                    <Button
                      bg={blue} color={white} borderRadius="xl" w="full"
                      onClick={handleClose}
                    >
                      Fechar
                    </Button>
                  </VStack>
                </VStack>

              ) : (
                /* Ecrã de pagamento */
                <VStack gap="5">
                  {/* Resumo */}
                  <Box w="full" bg="gray.50" borderRadius="xl" p="4" border="1px solid" borderColor="gray.100">
                    <HStack justify="space-between">
                      <VStack align="flex-start" gap="0">
                        <Text fontSize="xs" color="gray.400">Total a pagar</Text>
                        <Text fontSize="2xl" fontWeight="extrabold" color={blue}>
                          {amount.toFixed(2)} Kz
                        </Text>
                        <Text fontSize="xs" color="gray.400">para {workerName}</Text>
                      </VStack>
                      <Flex
                        w="44px" h="44px" borderRadius="full"
                        bg={`${blue}15`} color={blue}
                        alignItems="center" justifyContent="center"
                      >
                        <LuCreditCard size={18} />
                      </Flex>
                    </HStack>
                  </Box>

                  {/* Métodos */}
                  <Box w="full">
                    <Text fontSize="xs" color="gray.500" fontWeight="semibold" mb="2">
                      Método de pagamento
                    </Text>
                    <HStack gap="2">
                      {methods.map((m) => {
                        const Icon = m.icon;
                        const isSelected = selectedMethod === m.id;
                        return (
                          <Box
                            key={m.id} flex="1" borderRadius="xl" p="3"
                            border="1.5px solid"
                            borderColor={isSelected ? m.color : "gray.100"}
                            bg={isSelected ? `${m.color}10` : white}
                            cursor="pointer" transition="all 0.15s"
                            _hover={{ borderColor: m.color }}
                            onClick={() => setSelectedMethod(m.id)}
                            textAlign="center"
                          >
                            <Flex
                              w="32px" h="32px" borderRadius="lg" mx="auto" mb="1"
                              bg={isSelected ? `${m.color}20` : "gray.50"}
                              color={isSelected ? m.color : "gray.400"}
                              alignItems="center" justifyContent="center"
                            >
                              <Icon size={16} />
                            </Flex>
                            <Text fontSize="10px" fontWeight="bold" color={isSelected ? m.color : "gray.600"}>
                              {m.label}
                            </Text>
                            <Text fontSize="9px" color="gray.400">{m.desc}</Text>
                          </Box>
                        );
                      })}
                    </HStack>
                  </Box>

                  {/* Formulário cartão */}
                  {selectedMethod === "card" && (
                    <VStack gap="3" w="full">
                      <Field.Root>
                        <Field.Label fontSize="xs" color="gray.500" fontWeight="semibold" mb="1">
                          Número do cartão
                        </Field.Label>
                        <Input
                          size="sm" borderRadius="lg" placeholder="1234 5678 9012 3456"
                          maxLength={19} value={cardNumber}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                            setCardNumber(v.replace(/(.{4})/g, "$1 ").trim());
                          }}
                        />
                      </Field.Root>
                      <HStack gap="3" w="full">
                        <Field.Root flex="1">
                          <Field.Label fontSize="xs" color="gray.500" fontWeight="semibold" mb="1">
                            Validade
                          </Field.Label>
                          <Input
                            size="sm" borderRadius="lg" placeholder="MM/AA"
                            maxLength={5} value={cardExpiry}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                              setCardExpiry(v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v);
                            }}
                          />
                        </Field.Root>
                        <Field.Root flex="1">
                          <Field.Label fontSize="xs" color="gray.500" fontWeight="semibold" mb="1">
                            CVV
                          </Field.Label>
                          <Input
                            size="sm" borderRadius="lg" placeholder="123"
                            maxLength={3} type="password" value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          />
                        </Field.Root>
                      </HStack>
                    </VStack>
                  )}

                  {/* Formulário transferência */}
                  {selectedMethod === "transfer" && (
                    <Box w="full" bg="gray.50" borderRadius="xl" p="4" border="1px solid" borderColor="gray.100">
                      <VStack align="flex-start" gap="2">
                        <Text fontSize="xs" color="gray.400" fontWeight="semibold">
                          Dados para transferência
                        </Text>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="xs" color="gray.500">IBAN</Text>
                          <Text fontSize="xs" fontWeight="bold" color="gray.800">
                            AO06 0040 0000 1234 5678 9101 2
                          </Text>
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="xs" color="gray.500">Referência</Text>
                          <Text fontSize="xs" fontWeight="bold" color={blue}>
                            REF{serviceId.toString().padStart(8, "0")}
                          </Text>
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="xs" color="gray.500">Montante</Text>
                          <Text fontSize="xs" fontWeight="bold" color={blue}>
                            {amount.toFixed(2)} Kz
                          </Text>
                        </HStack>
                        <Text fontSize="10px" color="gray.400" mt="1">
                          Clica em "Confirmar pagamento" após realizar a transferência.
                        </Text>
                      </VStack>
                    </Box>
                  )}

                  {/* Formulário multicaixa */}
                  {selectedMethod === "multicaixa" && (
                    <VStack gap="3" w="full">
                      <Field.Root>
                        <Field.Label fontSize="xs" color="gray.500" fontWeight="semibold" mb="1">
                          Número de telefone
                        </Field.Label>
                        <Input
                          size="sm" borderRadius="lg" placeholder="9XX XXX XXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label fontSize="xs" color="gray.500" fontWeight="semibold" mb="1">
                          PIN Multicaixa Express
                        </Field.Label>
                        <Input
                          size="sm" borderRadius="lg" placeholder="••••••"
                          type="password" maxLength={6}
                          value={pin}
                          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        />
                      </Field.Root>
                      <Box w="full" bg="#F9731610" borderRadius="xl" p="3">
                        <Text fontSize="xs" color="#F97316" fontWeight="medium">
                          Será enviada uma notificação para confirmar o pagamento de {amount.toFixed(2)} Kz.
                        </Text>
                      </Box>
                    </VStack>
                  )}

                  {error && (
                    <Box w="full" bg="red.50" borderRadius="xl" p="3">
                      <Text fontSize="xs" color="red.500">{error}</Text>
                    </Box>
                  )}

                  {/* Botão pagar */}
                  <Button
                    w="full" bg={blue} color={white} borderRadius="xl" size="md"
                    _hover={{ opacity: 0.9 }}
                    onClick={onPay}
                    disabled={loading}
                  >
                    {loading ? (
                      <HStack gap="2">
                        <Spinner size="sm" color={white} />
                        <Text>A processar...</Text>
                      </HStack>
                    ) : (
                      `Confirmar pagamento — ${amount.toFixed(2)} Kz`
                    )}
                  </Button>
                </VStack>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}