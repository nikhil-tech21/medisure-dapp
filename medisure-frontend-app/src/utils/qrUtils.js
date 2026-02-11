export const encodeQRData = (batchId) => {
  return JSON.stringify({ batchId });
};

export const decodeQRData = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return { batchId: text };
  }
};