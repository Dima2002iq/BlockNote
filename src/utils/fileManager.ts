export function saveFile(url: string, filename: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "file-name";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export function copyText(text: string): boolean {
    try {
        navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        return false;
    }
}