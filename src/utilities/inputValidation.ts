export function validateInputsExist(inputs: string[]): Boolean {
  let res = true;
  inputs.forEach((input) => {
    if (input === "" || input === undefined || input == undefined) {
      res = false;
    }
  });
  return res;
}

export function validateDate(input: string): Boolean {
  const regex = new RegExp(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/);
  return regex.test(input)
}