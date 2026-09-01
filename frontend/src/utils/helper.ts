export function validateObject(obj: any, allowEmptyKeys: string[] = []) {
  const emptyRequiredKeys: string[] = [];

  for (const key in obj) {
    if (allowEmptyKeys.includes(key)) continue; // skip keys allowed to be empty

    const value = obj[key];
    const isEmpty = 
      value === undefined || 
      value === null || 
      (typeof value === "string" && value.trim() === "");

    if (isEmpty) {
      emptyRequiredKeys.push(key);
    }
  }

  return {
    isValid: emptyRequiredKeys.length === 0,
    emptyRequiredKeys, // tells you exactly which ones failed
  };
}