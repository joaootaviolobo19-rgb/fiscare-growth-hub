import { describe, expect, it } from "vitest";

import { formatCnpj, isValidCnpj, normalizeCnpj } from "./cnpj";

describe("cnpj", () => {
  it("aplica a máscara progressiva", () => {
    expect(formatCnpj("11")).toBe("11");
    expect(formatCnpj("11222")).toBe("11.222");
    expect(formatCnpj("11222333000181")).toBe("11.222.333/0001-81");
  });

  it("aceita as letras do CNPJ alfanumérico", () => {
    expect(formatCnpj("12abc34501de35")).toBe("12.ABC.345/01DE-35");
    expect(isValidCnpj("12.ABC.345/01DE-35")).toBe(true);
  });

  it("valida CNPJ numérico", () => {
    expect(isValidCnpj("11.222.333/0001-81")).toBe(true);
    expect(isValidCnpj("69.194.376/0001-80")).toBe(true);
  });

  it("recusa dígito verificador errado, tamanho curto e sequência repetida", () => {
    expect(isValidCnpj("11.222.333/0001-80")).toBe(false);
    expect(isValidCnpj("1122233300018")).toBe(false);
    expect(isValidCnpj("11.111.111/1111-11")).toBe(false);
  });

  it("recusa letra nos dígitos verificadores", () => {
    expect(isValidCnpj("12.ABC.345/01DE-3A")).toBe(false);
  });

  it("normaliza o valor digitado", () => {
    expect(normalizeCnpj(" 11.222.333/0001-81 ")).toBe("11222333000181");
    expect(normalizeCnpj("12.abc.345/01de-35")).toBe("12ABC34501DE35");
  });
});
