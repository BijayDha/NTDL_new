export const randomIdGenerator = () => {
  const options =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*()_+";
  let randomId = "";

  const generateRandomId = () => {
    for (let index = 0; index < 7; index++) {
      const singleDig = Math.floor(Math.random() * options.length);
      randomId += options[singleDig];
    }
  };
  generateRandomId();
  console.log(randomId);
  return randomId;
};
