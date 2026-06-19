const ENCODER = new TextEncoder();
const SECRET_KEY_STR = process.env.JWT_SECRET || 'fallback-super-secret-key-1234567890-seyediit';

// Base64url encode using global btoa
function base64urlEncode(str: string): string {
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Base64url decode using global atob
function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return decodeURIComponent(escape(atob(base64)));
}

// Import key for HMAC signing
async function getHmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    ENCODER.encode(SECRET_KEY_STR),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Signs a payload to create a secure session token.
 * Compatible with Edge Runtime and Node.js.
 */
export async function signToken(payload: Record<string, any>): Promise<string> {
  const payloadStr = JSON.stringify(payload);
  const key = await getHmacKey();
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    ENCODER.encode(payloadStr)
  );
  
  // Convert signature buffer to hex representation
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  const encodedPayload = base64urlEncode(payloadStr);
  return `${encodedPayload}.${signatureHex}`;
}

/**
 * Verifies a session token signature and validity.
 * Returns the decoded payload or null if invalid or expired.
 * Compatible with Edge Runtime and Node.js.
 */
export async function verifyToken(token: string): Promise<Record<string, any> | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  
  const [encodedPayload, signatureHex] = parts;
  try {
    const payloadStr = base64urlDecode(encodedPayload);
    const key = await getHmacKey();
    
    // Convert signature hex back to Uint8Array bytes
    const sigBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      ENCODER.encode(payloadStr)
    );
    
    if (!isValid) return null;
    
    const payload = JSON.parse(payloadStr);
    
    // Check if token has expired
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    
    return payload;
  } catch (e) {
    return null;
  }
}
