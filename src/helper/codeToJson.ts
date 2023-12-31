export default function codeToJson(code: any) {
  const formattedCode = code
    .replace(/\\/g, "\\\\") // Escape backslashes
    .replace(/"/g, '\\"') // Escape double quotes
    .replace(/\n/g, "\\n"); // Escape newlines

  return formattedCode;
}
