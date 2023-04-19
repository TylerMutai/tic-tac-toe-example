export const formatString = (string: string) => {
  return string.replaceAll("-", " ").replaceAll("_", " ");
}

export function toTitleCase(str: string) {
  return formatString(str).toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}