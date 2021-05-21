
//////////////////////////////////////////////////
//  MESSAGE
//////////////////////////////////////////////////

export default {
    props: ['message'],

    render({ message }) {
        return (
            <div class="message">
                <h2 style={{ color: message.author.color }}>{ message.author.username }<span class="timestamp">(à { this.formatDate(message.timestamp) })</span></h2>
                <p>{ message.content }</p>
            </div>
        );
    },

    methods: {
        formatDate(timestamp) {
            return new Intl.DateTimeFormat('fr-fr', { hour: '2-digit', minute: '2-digit' }).format(timestamp);
        }
    }
}
