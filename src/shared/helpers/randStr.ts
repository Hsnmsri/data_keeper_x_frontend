export default function randStr(length: number, hasNumber = false) {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  // check has number contains
  if (hasNumber) {
    characters = `${characters}0123456789`;
  }

  let result = '';
  const charactersLength = characters.length;

  // generate random string
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
