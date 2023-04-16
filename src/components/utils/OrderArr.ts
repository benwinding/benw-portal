
export function OrderArr(arr: any[], field: string, ascending?: boolean): void {
  function SortByField(a: any, b: any) {
    const aVal = (a[field] + "").toLowerCase();
    const bVal = (b[field] + "").toLowerCase();
    return aVal > bVal ? (ascending ? 1 : -1) : ascending ? -1 : 1;
  }
  arr.sort(SortByField);
}
