export function sanitizeInput(input: string): string {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function sanitizeOutput(output: string): string {
    return output.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}