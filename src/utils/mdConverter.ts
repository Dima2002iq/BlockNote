export function convertToHTML(text: string) {
    const regDict: any = {
        "###### (.*)\\n": "<h6>$1</h6>",
        "##### (.*)\\n": "<h5>$1</h5>",
        "#### (.*)\\n": "<h4>$1</h4>",
        "### (.*)\\n": "<h3>$1</h3>",
        "## (.*)\\n": "<h2>$1</h2>",
        "# (.*)\\n": "<h1>$1</h1>",
        "\\*\\*\\*(.*)\\*\\*\\*": "<em><strong>$1</strong></em>",
        "\\*\\*(.*)\\*\\*": "<strong>$1</strong>",
        "\\*(.*)\\*": "<em>$1</em>",
        "`(.*)`": "<code>$1</code>",
        "\\[(.*)\\]\\((.*)\\)": "<a href='$2'>$1</a>",
        "\\n": "<br>"
    };
    let convertedText = text;
    Object.keys(regDict).forEach(key => {
        convertedText = convertedText.replaceAll(new RegExp(key, "g"), regDict[key]);
    });
    return convertedText;
}