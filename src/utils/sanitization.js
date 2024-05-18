export function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
export function sanitizeOutput(output) {
    return output.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
