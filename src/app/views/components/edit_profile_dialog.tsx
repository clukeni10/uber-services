import React, { useState } from "react";
import {
  Box,
  Dialog,
  Portal,
  HStack,
  VStack,
  IconButton,
  Text,
  Separator,
  SimpleGrid,
  Field,
  Input,
  Textarea,
  Button,
  Flex,
  Select,
  FileUploadHiddenInput,
  createListCollection,
  Switch,
} from "@chakra-ui/react";
import {
  FileUploadDropzone,
  FileUploadRoot,
} from "@/components/ui/file-upload";
import { LuPencil, LuX, LuUpload } from "react-icons/lu";
import { validateBirthday, validatePhone } from "@/app/utils/validators";

// Props que el componente va a recibir
interface EditProfileDialogProps {
  role: "client" | "worker";
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  isSaving: boolean;
  specialties?: { items: Array<{ value: string; label: string }> };
  blue: string;
  white: string;
}

const specialties = createListCollection({
  items: [
    { label: "Barbeiro", value: "barbeiro" },
    { label: "Electricista", value: "electricista" },
    { label: "Canalizador", value: "canalizador" },
    { label: "Pintor", value: "pintor" },
    { label: "Diarista", value: "diarista" },
    { label: "Montador", value: "montador" },
    { label: "Jardinagem", value: "jardinagem" },
    { label: "Mudanças", value: "mudancas" },
  ],
});

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  role,
  form,
  setForm,
  onOpenChange,
  onSave,
  isSaving,
  blue,
  white,
}) => {
  const isWorker = role === "worker";

  const [birthdayError, setBirthdayError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handlePreSave = () => {
    const error = validateBirthday(form.birthday);
    const error2 = validatePhone(form.phone);

    if (error) {
      setBirthdayError(error);
      return;
    }

    if (error2){
      setPhoneError(error);
      return;
    }

    setPhoneError(null);
    setBirthdayError(null);
    onSave();
  };
  return (
    <Dialog.Root
      onOpenChange={(e) => {
        setBirthdayError(null);
        setPhoneError(null);
        onOpenChange(e.open);
      }}
      size={{ mdDown: "full", md: "lg" }}
    >
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Editar perfil"
          variant="ghost"
          size="sm"
          color={blue}
          _hover={{ bg: `${blue}15` }}
        >
          <LuPencil />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            borderRadius={{ base: isWorker ? "2xl" : "none", md: "2xl" }}
            p="4"
          >
            <Dialog.Header pb="2" pt="2">
              <HStack justify="space-between" align="center" w="full">
                <Dialog.Title fontSize="lg" fontWeight="bold" color="gray.800">
                  Editar Perfil
                </Dialog.Title>
                <Dialog.ActionTrigger asChild>
                  <IconButton
                    aria-label="Fechar"
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    _hover={{ color: "gray.600", bg: "gray.100" }}
                  >
                    <LuX />
                  </IconButton>
                </Dialog.ActionTrigger>
              </HStack>
            </Dialog.Header>

            <Dialog.Body py="4" px="2">
              {/* Cambiado a Flex/VStack según la estructura de ambos */}
              <VStack gap="5" align="stretch" w="full">
                {/* Foto de perfil */}
                <Box w="full">
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="semibold"
                    mb="2"
                  >
                    Foto de perfil
                  </Text>
                  <FileUploadRoot
                    maxFiles={1}
                    accept={isWorker ? { "image/*": [] } : ["image/*"]}
                    onFileChange={(e) => {
                      const file = e.acceptedFiles[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () =>
                          setForm({
                            ...form,
                            image: reader.result as string,
                          });
                        reader.readAsDataURL(file);
                      }
                    }}
                  >
                    <FileUploadDropzone
                      border="2px dashed"
                      borderColor="gray.200"
                      borderRadius="xl"
                      p="4"
                      _hover={{ borderColor: blue, bg: `${blue}08` }}
                      transition="all 0.2s"
                      cursor="pointer"
                      label={""}
                    >
                      <VStack gap="2">
                        {form.image ? (
                          <>
                            <Box
                              w="56px"
                              h="56px"
                              borderRadius="full"
                              overflow="hidden"
                              border="3px solid"
                              borderColor={blue}
                            >
                              <img
                                src={
                                  !isWorker && !form.image.startsWith("data:")
                                    ? `http://localhost:3001/${form.image}`
                                    : form.image
                                }
                                alt="avatar"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                            <Text fontSize="xs" color="gray.400">
                              Clica ou arrasta para alterar
                            </Text>
                          </>
                        ) : (
                          <>
                            <Flex
                              w="44px"
                              h="44px"
                              borderRadius="full"
                              bg={`${blue}15`}
                              color={blue}
                              alignItems="center"
                              justifyContent="center"
                            >
                              <LuUpload size={18} />
                            </Flex>
                            <VStack gap="0">
                              <Text
                                fontSize="xs"
                                fontWeight="semibold"
                                color="gray.600"
                              >
                                Clica ou arrasta uma imagem
                              </Text>
                              <Text fontSize="10px" color="gray.400">
                                PNG, JPG até 2MB
                              </Text>
                            </VStack>
                          </>
                        )}
                      </VStack>
                    </FileUploadDropzone>
                    <FileUploadHiddenInput />
                  </FileUploadRoot>
                </Box>

                <Separator borderColor="gray.100" />

                {/* Inputs Comunes (Nombre, Email, Teléfono, Cumpleaños, Dirección) */}
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" w="full">
                  <Field.Root required>
                    <Field.Label
                      fontSize="xs"
                      color="gray.500"
                      fontWeight="semibold"
                      mb="1"
                    >
                      Nome
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="lg"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label
                      fontSize="xs"
                      color="gray.500"
                      fontWeight="semibold"
                      mb="1"
                    >
                      Email
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="lg"
                      type={isWorker ? undefined : "email"}
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </Field.Root>

                  <Field.Root invalid={!!phoneError}>
                    <Field.Label
                      fontSize="xs"
                      color="gray.500"
                      fontWeight="semibold"
                      mb="1"
                    >
                      Telefone
                    </Field.Label>
                    <Input
  size="sm" borderRadius="lg"
  placeholder="9XX XXX XXX"
  inputMode="numeric"          // ← teclado numérico no mobile
  value={form.phone}
  onChange={(e) => {
    // remove tudo que não seja dígito e limita a 9
    const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
    setForm({ ...form, phone: digits });
    if(phoneError) setPhoneError(null);
  }}
/>

                    {/* Exibe a mensagem de erro se ela existir */}
                    {phoneError && (
                      <Field.ErrorText fontSize="xs" color="red.500" mt="1">
                        {phoneError}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root invalid={!!birthdayError}>
                    <Field.Label
                      fontSize="xs"
                      color="gray.500"
                      fontWeight="semibold"
                      mb="1"
                    >
                      Aniversário
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="lg"
                      type="date"
                      value={form.birthday}
                      onChange={(e) => {
                        setForm({ ...form, birthday: e.target.value });
                        // Limpa o erro em tempo real enquanto o utilizador digita
                        if (birthdayError) setBirthdayError(null);
                      }}
                    />
                    {/* Exibe a mensagem de erro se ela existir */}
                    {birthdayError && (
                      <Field.ErrorText fontSize="xs" color="red.500" mt="1">
                        {birthdayError}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root
                    gridColumn={
                      isWorker ? "span 2" : { base: "span 1", sm: "span 2" }
                    }
                  >
                    <Field.Label
                      fontSize="xs"
                      color="gray.500"
                      fontWeight="semibold"
                      mb="1"
                    >
                      Endereço
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="lg"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                  </Field.Root>

                  {/* Campos Exclusivos del Trabajador (Worker) */}
                  {isWorker && specialties && (
                    <>
                      <Field.Root>
                        <Field.Label
                          fontSize="xs"
                          color="gray.500"
                          fontWeight="semibold"
                          mb="1"
                        >
                          Especialidade
                        </Field.Label>
                        <Select.Root
                          collection={specialties}
                          size="sm"
                          value={[form.specialty]}
                          onValueChange={(e) =>
                            setForm({ ...form, specialty: e.value[0] })
                          }
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger borderRadius="lg">
                              <Select.ValueText placeholder="Selecionar" />
                            </Select.Trigger>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                {specialties.items.map((item) => (
                                  <Select.Item item={item} key={item.value}>
                                    {item.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      </Field.Root>

                      <Field.Root>
                        <Field.Label
                          fontSize="xs"
                          color="gray.500"
                          fontWeight="semibold"
                          mb="1"
                        >
                          Preço/hora (Kz)
                        </Field.Label>
                        <Input
                          size="sm"
                          borderRadius="lg"
                          type="number"
                          value={form.hourly_rate}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              hourly_rate: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Field.Root>

                      <Field.Root gridColumn="span 2">
                        <Field.Label
                          fontSize="xs"
                          color="gray.500"
                          fontWeight="semibold"
                          mb="1"
                        >
                          Bio
                        </Field.Label>
                        <Textarea
                          size="sm"
                          borderRadius="lg"
                          value={form.bio}
                          resize="none"
                          onChange={(e) =>
                            setForm({ ...form, bio: e.target.value })
                          }
                        />
                      </Field.Root>

                      <Field.Root gridColumn="span 2">
                        <Box
                          bg="gray.50"
                          borderRadius="xl"
                          px="4"
                          py="3"
                          border="1px solid"
                          borderColor="gray.100"
                        >
                          <HStack justify="space-between">
                            <VStack align="flex-start" gap="0">
                              <Text
                                fontSize="xs"
                                color="gray.500"
                                fontWeight="semibold"
                              >
                                Disponível para serviços
                              </Text>
                              <Text fontSize="10px" color="gray.400">
                                Clientes podem ver e contratar o teu perfil
                              </Text>
                            </VStack>
                            <Switch.Root
                              checked={form.is_available}
                              onCheckedChange={(e) =>
                                setForm({ ...form, is_available: e.checked })
                              }
                            >
                              <Switch.HiddenInput />
                              <Switch.Control>
                                <Switch.Thumb />
                              </Switch.Control>
                            </Switch.Root>
                          </HStack>
                        </Box>
                      </Field.Root>
                    </>
                  )}
                </SimpleGrid>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer
              pt={isWorker ? "2" : "0"}
              pb={isWorker ? "4" : undefined}
              px={isWorker ? "2" : undefined}
            >
              {isWorker ? (
                <Dialog.ActionTrigger asChild>
                  <Button
                    bg={blue}
                    color={white}
                    borderRadius={isWorker ? "xl" : "lg"}
                    w="full"
                    onClick={handlePreSave}
                    loading={isSaving}
                    loadingText="A guardar..."
                  >
                    Guardar alterações
                  </Button>
                </Dialog.ActionTrigger>
              ) : (
                <Button
                  bg={blue}
                  color={white}
                  borderRadius={isWorker ? "xl" : "lg"}
                  w="full"
                  onClick={handlePreSave}
                  loading={isSaving}
                  loadingText="A guardar..."
                >
                  Guardar alterações
                </Button>
              )}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
