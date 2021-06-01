import { parseMarkdown } from '../utils.js';


//////////////////////////////////////////////////
//  MESSAGE
//////////////////////////////////////////////////

export default {
    props: ['message'],

    render({ message }) {
        return (
            <div class="message">
                { message.author.admin && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M5,0a5,5,0,1,0,5,5A5,5,0,0,0,5,0Zm.912,5.912L5,8.333,4.088,5.912,1.667,5l2.421-.912L5,1.667l.912,2.421L8.333,5Z" fill={ message.author.color }/></svg> }
                <h2 style={{ color: message.author.color }}>{ message.author.username }<span>{ this.formatDate(message.timestamp) }</span></h2>
                <div v-html={ parseMarkdown(message.content) }></div>
            </div>
        );
    },

    methods: {
        formatDate(timestamp) {
            return `(à ${new Intl.DateTimeFormat('fr-fr', { hour: '2-digit', minute: '2-digit' }).format(timestamp)})`;
        }
    }
}
