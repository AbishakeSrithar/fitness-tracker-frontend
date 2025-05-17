export function validateInputsExist(inputs: string[]): Boolean {
  let res = true;
  inputs.forEach((input) => {
    if (input === "" || input === undefined || input == undefined) {
      res = false;
    }
  });
  return res;
}
