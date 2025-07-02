async function hashOTP(otp) {
    const encoder = new TextEncoder();
    const data = encoder.encode(otp);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export async function validateOTP(userInputOTP, hashedOTPFromAPI) {
    try {
        const hashedInput = await hashOTP(userInputOTP);
        return hashedInput === hashedOTPFromAPI;
    } catch (error) {
        console.error('Error validating OTP:', error);
        return false;
    }
}


  