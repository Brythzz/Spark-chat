import sanitizeHtml from 'sanitize-html';


//////////////////////////////////////////////////
//  MESSAGE
//////////////////////////////////////////////////

export default {
    props: ['message'],

    render({ message }) {
        return (
            <div class="message">
                <h2 style={{ color: message.author.color }}>{ message.author.username }<span class="timestamp">(à { this.formatDate(message.timestamp) })</span></h2>
                <div v-html={ this.parseMarkdown(message.content) }></div>
            </div>
        );
    },

    methods: {
        formatDate(timestamp) {
            return new Intl.DateTimeFormat('fr-fr', { hour: '2-digit', minute: '2-digit' }).format(timestamp);
        },

        parseMarkdown(str) {
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
                .replace(link, '<a src="$1" target="blank" rel="noreferrer noopener">$1</a>')
                .replace(bold, '<b>$1<b>')
                .replace(italics, '<i>$1</i>')
                .replace(underline, '<u>$1</u>')
                .replace(strikethrough, '<strike>$1</strike>');

            return content;
        }
    }
}
