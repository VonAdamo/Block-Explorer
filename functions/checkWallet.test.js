import {it, expect} from "vitest";
import isValidWalletAddress from "./checkWallet.js";

it('should return true for a valid wallet address', () => {
    const validAddress = '0xC2a90d15342fa02452798f078DEe8c2A1e8eE89f';
    const result = isValidWalletAddress(validAddress);
    expect(result).toBe(true);
});
  
it('should return false for an invalid wallet address', () => {
    const invalidAddress = '0x12345';
    const result = isValidWalletAddress(invalidAddress);
    expect(result).toBe(false);
});