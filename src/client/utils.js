import sanitizeHtml from 'sanitize-html';


//////////////////////////////////////////////////
//  UTILS
//////////////////////////////////////////////////

export const parseMarkdown = (str) => {
    const sanitized = sanitizeHtml(str, {
        allowedTags: [],
        allowedAttributes: {},
        disallowedTagsMode: 'recursiveEscape'
    });

    const link = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
    const bold = /\*\*(.*)\*\*/g;
    const italics = /\*(.*)\*/g;
    const underline = /__(.*)__/g;
    const strikethrough = /~~(.*)~~/g;

    const content = sanitized
        .replace(link, '<a href="$1" target="blank" rel="noreferrer noopener">$1</a>')
        .replace(bold, '<b>$1<b>')
        .replace(italics, '<i>$1</i>')
        .replace(underline, '<u>$1</u>')
        .replace(strikethrough, '<strike>$1</strike>');

    return content;
}


export const setEndOfContenteditable = (contentEditableElement) => {
    let range, selection;
    if (document.createRange)
    {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else if (document.selection)
    { 
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}