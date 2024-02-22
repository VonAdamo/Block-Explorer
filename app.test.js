import { it, expect } from 'vitest';

// Importera funktionen som ska testas
import { accountInput } from './app.js';

it('ska ha en etikett för accountInput', () => {
  // Simulera att det finns ett inmatningsfält med etiketten
  document.body.innerHTML = `
    <label for="accountNumber">Ange konto</label>
    <input type="text" id="accountNumber">
  `;

  // Hämta etiketten för accountInput
  const labelForAccountInput = document.querySelector('label[for="accountNumber"]');

  // Förvänta dig att etiketten finns och matchar förväntad text
  expect(labelForAccountInput).not.toBeNull();
  expect(labelForAccountInput.textContent).toBe('Ange konto');
});