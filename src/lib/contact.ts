const whatsappNumber = "5551986165920";

export const whatsappDisplay = "(51) 98616-5920";

export const whatsappMessages = {
  contato: "Olá! Vim pelo site da Fiscare e quero conversar sobre a minha empresa.",
  saida:
    "Olá! Estava vendo o site da Fiscare e quero tirar uma dúvida antes de pedir o diagnóstico.",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
