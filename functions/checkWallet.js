
export default function isValidWalletAddress(address) {
    const walletAddressRegex = /^0x[0-9a-fA-F]{40}$/;
    return walletAddressRegex.test(address);
}