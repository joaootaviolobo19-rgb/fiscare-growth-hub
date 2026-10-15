import { describe, expect, it } from 'vitest';
import { contactSchema, diagnosisSchema } from './diagnosis';
const valid = { name: 'João Silva', phone: '(11) 99999-1234', email: 'joao@example.com', company: 'Minha empresa', industry: 'Serviços', needs: ['Financeiro'], message: '', consent: true };
describe('Diagnosis rules', () => {
 it('requires LGPD consent before submission', () => { expect(diagnosisSchema.safeParse(valid).success).toBe(true); expect(diagnosisSchema.safeParse({ ...valid, consent: false }).success).toBe(false); });
 it('requires at least one area of help', () => { expect(diagnosisSchema.safeParse({ ...valid, needs: [] }).success).toBe(false); });
 it('rejects invalid contact data', () => { expect(contactSchema.safeParse({ ...valid, email: 'invalid', phone: '123' }).success).toBe(false); });
});
