import { setEndOfContenteditable } from '../utils.js';


//////////////////////////////////////////////////
//  MESSAGE BAR
//////////////////////////////////////////////////

export default {
    props: ['ws'],

    data() {
        return {
            message: '',
            lastMessage: '',
            temp_event: ''
        };
    },

    render({ message }) {
        return (
            <form>
                { !message && <span class="placeholder">Message...</span> }
                <div onInput={ this.setMessage } class="chatbox" role="textbox" contenteditable="true" spellcheck="true" autocorrect="false" ref="messageBar">
                    <br />
                </div>
            </form>
        );
    },

    mounted() {
        const bar = this.$refs.messageBar;

        bar.addEventListener('keydown', event => {
            this.temp_event = event.key;

            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();

                if (!/\S/.test(this.message)) return;

                this.sendMessage(this.message);
                bar.innerText = '';
            }
            else if (event.key === 'ArrowUp' && !this.message) {
                event.preventDefault();
                this.message = this.lastMessage;
                bar.innerText = this.lastMessage;
                setEndOfContenteditable(bar);
            }
        });
    },

    methods: {
        setMessage(event) {
            this.message = event.target.innerText;
        },

        sendMessage() {
            if (!/\S/.test(this.message)) return;
            this.lastMessage = this.message;

            this.ws.send(JSON.stringify({ op: 1, content: this.message }));
            this.message = '';
        },
    }
}
