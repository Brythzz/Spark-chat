import Message from '../components/Message';

//////////////////////////////////////////////////
//  CHAT
//////////////////////////////////////////////////

export default {
    data() {
        return {
            messages: [],
            message: ''
        };
    },

    render() {
        return (
            <div class="container chat">
                <div class="messageContainer">
                    {
                        this.messages.map((message, index) => {
                            return <Message message={ message } key={ index } />
                        })
                    }
                    <div id="bot" ref="bottom"></div>
                </div>
                <form onSubmit={(event) => { event.preventDefault(); this.sendMessage() }}>
                    <input v-model={ this.message } type="text" placeholder="Message..." maxlength="512" />
                </form>
            </div>
        );
    },

    created() {
        this.ws = new WebSocket(`ws://${window.location.host}`);

        this.ws.onmessage = (message) => this.messages.push(JSON.parse(message.data).d);
    },

    updated() {
        this.$refs.bottom.scrollIntoView({ behavior: 'smooth' });
    },

    methods: {
        sendMessage() {
            if (!this.message) return;

            this.ws.send(JSON.stringify({ op: 1, content: this.message }));
            this.message = '';
        }
    },
}
