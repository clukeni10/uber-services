import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Dialog,
  Portal,
  Field,
  Textarea,
} from "@chakra-ui/react";
import {
  LuCreditCard,
  LuBanknote,
  LuSmartphone,
  LuCircleCheck,
  LuX,
  LuDownload,
  LuStar,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import { usePayment } from "@/app/controllers/usePayment";
import { generateInvoicePDF } from "@/app/utils/generateInvoicePDF";
import { submitReview } from "@/app/models/reviews";
import { blue, white } from "@/app/utils/COLORS";

type Method = "card" | "transfer" | "multicaixa";
type Screen = "payment" | "success" | "review";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: number;
  amount: number;
  workerName: string;
  workerId: number;
  onSuccess: () => void;
}

const methods = [
  {
    id: "card" as Method,
    label: "Cartão",
    desc: "Crédito ou débito",
    icon: LuCreditCard,
    color: blue,
  },
  {
    id: "transfer" as Method,
    label: "Transferência",
    desc: "Bancária",
    icon: LuBanknote,
    color: "#10B981",
  },
  {
    id: "multicaixa" as Method,
    label: "Multicaixa Express",
    desc: "Via telefone",
    icon: LuSmartphone,
    color: "#F97316",
  },
];

export default function PaymentModal({
  isOpen,
  onClose,
  serviceId,
  amount,
  workerName,
  workerId,
  onSuccess,
}: PaymentModalProps) {
  const [screen, setScreen] = useState<Screen>("payment");
  const [selectedMethod, setSelectedMethod] = useState<Method>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  // Avaliação
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);

  // Guarda local — garante que o botão nunca fica preso em "loading"
  // mesmo que o hook usePayment rebente ou não trate o erro.
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    handlePayment,
    loading,
    error,
    success,
    reference,
    invoiceData,
    reset,
  } = usePayment();

  // Reset ao abrir
  useEffect(() => {
    if (isOpen) {
      reset();
      setScreen("payment");
      setSelectedMethod("card");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setPhone("");
      setPin("");
      setRating(0);
      setComment("");
      setReviewDone(false);
      setIsSubmitting(false);
      setLocalError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Muda para a tela de sucesso assim que o pagamento for confirmado.
  // Não depende de invoiceData estar completo — se faltar, mostramos "—".
  useEffect(() => {
    if (success) {
      setScreen("success");
      setIsSubmitting(false);
    }
  }, [success]);

  async function onPay() {
    if (isSubmitting || loading) return;

    setLocalError(null);
    setIsSubmitting(true);

    try {
      const extra: { card_last4?: string; phone?: string } = {};
      if (selectedMethod === "card") {
        extra.card_last4 = cardNumber.replace(/\s/g, "").slice(-4);
      }
      if (selectedMethod === "multicaixa") {
        extra.phone = phone;
      }

      await handlePayment(serviceId, selectedMethod, extra);
    } catch (err) {
      setLocalError(
        err instanceof Error
          ? err.message
          : "Não foi possível concluir o pagamento. Tenta novamente.",
      );
    } finally {
      // Garante sempre a saída do estado de loading, mesmo em falha silenciosa.
      setIsSubmitting(false);
    }
  }

  async function onSubmitReview() {
    if (rating === 0) return;
    setReviewLoading(true);
    try {
      await submitReview({ service_id: serviceId, rating, comment });
      setReviewDone(true);
    } catch {
      // silencia erro — avaliação é opcional
    } finally {
      setReviewLoading(false);
    }
  }

  function handleClose() {
    onClose();
    if (success) onSuccess();
  }

  const isPaying = isSubmitting || loading;
  const displayError = localError ?? error;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && handleClose()}
      size={{ mdDown: "full", md: "md" }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" p="4">
            <Dialog.Header pb="2">
              <HStack justify="space-between" w="full">
                <Dialog.Title fontSize="lg" fontWeight="bold" color="gray.800">
                  {screen === "payment" && "Pagamento"}
                  {screen === "success" && "Pagamento confirmado"}
                  {screen === "review" && "Avaliar profissional"}
                </Dialog.Title>
                {/* Só escondemos o X enquanto o pagamento está mesmo a ser
                    submetido — nunca fica preso escondido. */}
                {!isPaying && (
                  <Box
                    cursor="pointer"
                    color="gray.400"
                    _hover={{ color: "gray.600" }}
                    onClick={handleClose}
                  >
                    <LuX size={18} />
                  </Box>
                )}
              </HStack>
            </Dialog.Header>

            <Dialog.Body py="4" px="2">
              {/* ── Tela de pagamento ── */}
              {screen === "payment" && (
                <VStack gap="5">
                  {/* Resumo */}
                  <Box
                    w="full"
                    bg="gray.50"
                    borderRadius="xl"
                    p="4"
                    border="1px solid"
                    borderColor="gray.100"
                  >
                    <HStack justify="space-between">
                      <VStack align="flex-start" gap="0">
                        <Text fontSize="xs" color="gray.400">
                          Total a pagar
                        </Text>
                        <Text
                          fontSize="2xl"
                          fontWeight="extrabold"
                          color={blue}
                        >
                          {amount.toFixed(2)} Kz
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          para {workerName}
                        </Text>
                      </VStack>
                      <Flex
                        w="44px"
                        h="44px"
                        borderRadius="full"
                        bg={`${blue}15`}
                        color={blue}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <LuCreditCard size={18} />
                      </Flex>
                    </HStack>
                  </Box>

                  {/* Métodos */}
                  <Box w="full">
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      fontWeight="semibold"
                      mb="2"
                    >
                      Método de pagamento
                    </Text>
                    <HStack gap="2">
                      {methods.map((m) => {
                        const Icon = m.icon;
                        const isSelected = selectedMethod === m.id;
                        return (
                          <Box
                            key={m.id}
                            flex="1"
                            borderRadius="xl"
                            p="3"
                            border="1.5px solid"
                            borderColor={isSelected ? m.color : "gray.100"}
                            bg={isSelected ? `${m.color}10` : white}
                            cursor="pointer"
                            transition="all 0.15s"
                            _hover={{ borderColor: m.color }}
                            onClick={() => setSelectedMethod(m.id)}
                            textAlign="center"
                          >
                            <Flex
                              w="32px"
                              h="32px"
                              borderRadius="lg"
                              mx="auto"
                              mb="1"
                              bg={isSelected ? `${m.color}20` : "gray.50"}
                              color={isSelected ? m.color : "gray.400"}
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon size={16} />
                            </Flex>
                            <Text
                              fontSize="10px"
                              fontWeight="bold"
                              color={isSelected ? m.color : "gray.600"}
                            >
                              {m.label}
                            </Text>
                            <Text fontSize="9px" color="gray.400">
                              {m.desc}
                            </Text>
                          </Box>
                        );
                      })}
                    </HStack>
                  </Box>

                  {/* Cartão */}
                  {selectedMethod === "card" && (
                    <VStack gap="3" w="full">
                      <Field.Root>
                        <Field.Label
                          fontSize="xs"
                          color="gray.500"
                          fontWeight="semibold"
                          mb="1"
                        >
                          Número do cartão
                        </Field.Label>
                        <Input
                          size="sm"
                          borderRadius="lg"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            const v = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 16);
                            setCardNumber(v.replace(/(.{4})/g, "$1 ").trim());
                          }}
                        />
                      </Field.Root>
                      <HStack gap="3" w="full">
                        <Field.Root flex="1">
                          <Field.Label
                            fontSize="xs"
                            color="gray.500"
                            fontWeight="semibold"
                            mb="1"
                          >
                            Validade
                          </Field.Label>
                          <Input
                            size="sm"
                            borderRadius="lg"
                            placeholder="MM/AA"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => {
                              const v = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 4);
                              setCardExpiry(
                                v.length > 2
                                  ? `${v.slice(0, 2)}/${v.slice(2)}`
                                  : v,
                              );
                            }}
                          />
                        </Field.Root>
                        <Field.Root flex="1">
                          <Field.Label
                            fontSize="xs"
                            color="gray.500"
                            fontWeight="semibold"
                            mb="1"
                          >
                            CVV
                          </Field.Label>
                          <Input
                            size="sm"
                            borderRadius="lg"
                            placeholder="123"
                            maxLength={3}
                            type="password"
                            value={cardCvv}
                            onChange={(e) =>
                              setCardCvv(
                                e.target.value.replace(/\D/g, "").slice(0, 3),
                              )
                            }
                          />
                        </Field.Root>
                      </HStack>
                    </VStack>
                  )}

                  {/* Transferência */}
                  {selectedMethod === "transfer" && (
                    <Box
                      w="full"
                      bg="gray.50"
                      borderRadius="xl"
                      p="4"
                      border="1px solid"
                      borderColor="gray.100"
                    >
                      <VStack align="flex-start" gap="2">
                        <Text
                          fontSize="xs"
                          color="gray.400"
                          fontWeight="semibold"
                        >
                          Dados para transferência
                        </Text>
                        {[
                          {
                            label: "IBAN",
                            value: "AO06 0040 0000 1234 5678 9101 2",
                          },
                          {
                            label: "Referência",
                            value: `REF${serviceId.toString().padStart(8, "0")}`,
                          },
                          {
                            label: "Montante",
                            value: `${amount.toFixed(2)} Kz`,
                          },
                        ].map((row) => (
                          <HStack
                            key={row.label}
                            justify="space-between"
                            w="full"
                          >
                            <Text fontSize="xs" color="gray.500">
                              {row.label}
                            </Text>
                            <Text
                              fontSize="xs"
                              fontWeight="bold"
                              color="gray.800"
                            >
                              {row.value}
                            </Text>
                          </HStack>
                        ))}
                        <Text fontSize="10px" color="gray.400" mt="1">
                          Clica em "Confirmar pagamento" após realizares a
                          transferência.
                        </Text>
                      </VStack>
                    </Box>
                  )}

                  {/* Multicaixa */}
                  {selectedMethod === "multicaixa" && (
                    <VStack gap="3" w="full">
                      <Field.Root>
                        <Field.Label
                          fontSize="xs"
                          color="gray.500"
                          fontWeight="semibold"
                          mb="1"
                        >
                          Número de telefone
                        </Field.Label>
                        <Input
                          size="sm"
                          borderRadius="lg"
                          placeholder="9XX XXX XXX"
                          value={phone}
                          onChange={(e) =>
                            setPhone(
                              e.target.value.replace(/\D/g, "").slice(0, 9),
                            )
                          }
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label
                          fontSize="xs"
                          color="gray.500"
                          fontWeight="semibold"
                          mb="1"
                        >
                          PIN Multicaixa Express
                        </Field.Label>
                        <Input
                          size="sm"
                          borderRadius="lg"
                          placeholder="••••••"
                          type="password"
                          maxLength={6}
                          value={pin}
                          onChange={(e) =>
                            setPin(
                              e.target.value.replace(/\D/g, "").slice(0, 6),
                            )
                          }
                        />
                      </Field.Root>
                      <Box w="full" bg="#F9731610" borderRadius="xl" p="3">
                        <Text fontSize="xs" color="#F97316" fontWeight="medium">
                          Será enviada uma notificação para confirmar o
                          pagamento de {amount.toFixed(2)} Kz.
                        </Text>
                      </Box>
                    </VStack>
                  )}

                  {displayError && (
                    <Box w="full" bg="red.50" borderRadius="xl" p="3">
                      <Text fontSize="xs" color="red.500">
                        {displayError}
                      </Text>
                    </Box>
                  )}

                  <Button
                    w="full"
                    bg={blue}
                    color={white}
                    borderRadius="xl"
                    size="md"
                    _hover={{ opacity: 0.9 }}
                    onClick={onPay}
                    loading={isPaying}
                    loadingText="A processar..."
                    disabled={isPaying}
                  >
                    {`Confirmar pagamento — ${amount.toFixed(2)} Kz`}
                  </Button>
                </VStack>
              )}

              {/* ── Tela de sucesso ── */}
              {screen === "success" && (
                <VStack gap="5" py="4">
                  <Flex
                    w="72px"
                    h="72px"
                    borderRadius="full"
                    bg="#10B98115"
                    color="#10B981"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <LuCircleCheck size={36} />
                  </Flex>

                  <VStack gap="1" textAlign="center">
                    <Text fontWeight="extrabold" fontSize="xl" color="gray.800">
                      Pagamento efetuado!
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      O serviço de <strong>{workerName}</strong> foi pago com
                      sucesso.
                    </Text>
                  </VStack>

                  {/* Summary — protegido contra invoiceData incompleto */}
                  <Box
                    w="full"
                    bg="gray.50"
                    borderRadius="xl"
                    p="4"
                    border="1px solid"
                    borderColor="gray.100"
                  >
                    <VStack align="stretch" gap="2">
                      <Text
                        fontSize="xs"
                        color="gray.400"
                        fontWeight="semibold"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        Resumo
                      </Text>
                      {[
                        {
                          label: "Referência",
                          value: invoiceData?.reference ?? reference ?? "—",
                        },
                        {
                          label: "Serviço",
                          value: invoiceData?.description ?? "—",
                        },
                        {
                          label: "Profissional",
                          value: invoiceData?.worker?.name ?? workerName,
                        },
                        {
                          label: "Total pago",
                          value: invoiceData?.amount
                            ? `${invoiceData.amount.toFixed(2)} Kz`
                            : `${amount.toFixed(2)} Kz`,
                        },
                        {
                          label: "Taxa (2%)",
                          value: invoiceData?.platform_fee
                            ? `${invoiceData.platform_fee.toFixed(2)} Kz`
                            : "—",
                        },
                      ].map((row) => (
                        <HStack key={row.label} justify="space-between">
                          <Text fontSize="xs" color="gray.500">
                            {row.label}
                          </Text>
                          <Text
                            fontSize="xs"
                            fontWeight="semibold"
                            color="gray.800"
                          >
                            {row.value}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>

                  <VStack gap="2" w="full">
                    {invoiceData && (
                      <Button
                        w="full"
                        variant="outline"
                        borderRadius="xl"
                        borderColor={blue}
                        color={blue}
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
                      w="full"
                      bg={blue}
                      color={white}
                      borderRadius="xl"
                      onClick={() => setScreen("review")}
                    >
                      Avaliar profissional
                    </Button>
                    <Button
                      w="full"
                      variant="ghost"
                      borderRadius="xl"
                      color="gray.500"
                      onClick={handleClose}
                    >
                      Fechar
                    </Button>
                  </VStack>
                </VStack>
              )}

              {/* ── Tela de avaliação ── */}
              {screen === "review" && (
                <VStack gap="5" py="4">
                  {reviewDone ? (
                    <VStack gap="4" textAlign="center">
                      <Flex
                        w="64px"
                        h="64px"
                        borderRadius="full"
                        bg="#F59E0B15"
                        color="#F59E0B"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <LuStar size={30} fill="#F59E0B" />
                      </Flex>
                      <Text fontWeight="bold" fontSize="lg" color="gray.800">
                        Obrigado pela avaliação!
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        A tua avaliação ajuda outros clientes a encontrar os
                        melhores profissionais.
                      </Text>
                      <Button
                        w="full"
                        bg={blue}
                        color={white}
                        borderRadius="xl"
                        onClick={handleClose}
                      >
                        Fechar
                      </Button>
                    </VStack>
                  ) : (
                    <>
                      <VStack gap="1" textAlign="center">
                        <Text fontWeight="bold" fontSize="lg" color="gray.800">
                          Como foi o serviço?
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Avalia o trabalho de <strong>{workerName}</strong>
                        </Text>
                      </VStack>

                      {/* Estrelas */}
                      <HStack gap="2" justify="center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Box
                            key={star}
                            cursor="pointer"
                            color={
                              (hoverRating || rating) >= star
                                ? "#F59E0B"
                                : "gray.200"
                            }
                            transition="all 0.1s"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                          >
                            <LuStar
                              size={36}
                              fill={
                                (hoverRating || rating) >= star
                                  ? "#F59E0B"
                                  : "currentColor"
                              }
                            />
                          </Box>
                        ))}
                      </HStack>

                      {rating > 0 && (
                        <Text
                          fontSize="sm"
                          color="#F59E0B"
                          fontWeight="semibold"
                          textAlign="center"
                        >
                          {
                            [
                              "",
                              "Muito mau",
                              "Mau",
                              "Razoável",
                              "Bom",
                              "Excelente",
                            ][rating]
                          }
                        </Text>
                      )}

                      <Field.Root w="full">
                        <Field.Label
                          fontSize="xs"
                          color="gray.500"
                          fontWeight="semibold"
                          mb="1"
                        >
                          Comentário (opcional)
                        </Field.Label>
                        <Textarea
                          size="sm"
                          borderRadius="lg"
                          resize="none"
                          rows={3}
                          placeholder="Descreve a tua experiência..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Field.Root>

                      <VStack gap="2" w="full">
                        <Button
                          w="full"
                          bg={blue}
                          color={white}
                          borderRadius="xl"
                          disabled={rating === 0}
                          loading={reviewLoading}
                          onClick={onSubmitReview}
                        >
                          Submeter avaliação
                        </Button>
                        <Button
                          w="full"
                          variant="ghost"
                          borderRadius="xl"
                          color="gray.400"
                          onClick={handleClose}
                        >
                          Saltar
                        </Button>
                      </VStack>
                    </>
                  )}
                </VStack>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}