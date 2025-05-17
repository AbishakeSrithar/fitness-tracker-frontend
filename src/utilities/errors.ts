export function generateErrorMessage(errorMsg: string, insertBefore: string) {
  const prevTable = document.querySelector("table");
  if (prevTable) {
    prevTable.remove();
  }
  const errorText = document.createTextNode(errorMsg);
  // appends <table> before div we're using as a divider
  const div = document.getElementById(insertBefore);
  document.body.insertBefore(errorText, div);
}
