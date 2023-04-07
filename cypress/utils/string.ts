export const capitalize = (str: string) => {
  const lowerCaseStr = str.toLowerCase();

  return str.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
}

export const camelize = (str: string) => str.replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()
).replace(/\s+/g, '');

export const toKebabCase = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();

export default { capitalize, camelize, toKebabCase };
