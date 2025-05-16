export function normalizeFormData<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map(normalizeFormData) as T;
  } else if (data && typeof data === 'object') {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (value === '') {
        acc[key] = null;
      } else if (typeof value === 'object' && value !== null) {
        acc[key] = normalizeFormData(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as any);
  }
  return data;
}
