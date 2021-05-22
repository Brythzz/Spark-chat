import Message from '../components/Message';

//////////////////////////////////////////////////
//  CHAT
//////////////////////////////////////////////////

export default {
    data() {
        return {
            messages: [],
            message: '',
            lastMessage: ''
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
                    <input v-model={ this.message } type="text" placeholder="Message..." maxlength="512" ref="messageBar" />
                </form>
            </div>
        );
    },

    created() {
        this.ws = new WebSocket(`ws://${window.location.host}/ws`);

        this.ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            switch(data.op) {
                case 0:
                    this.messages.push(data.d);
                    break;

                case 2:
                    setInterval(() => {
                        this.ws.send('{"op":3}');
                    }, data.d);
                    break;

                default:
                    break;
            }
        }

        this.ws.onerror = () => this.$router.push('login');
        this.ws.onclose = () => this.ws = new WebSocket(`ws://${window.location.host}/ws`);
    },

    mounted() {
        this.$refs.messageBar.addEventListener('keydown', event => {
            if (event.keyCode === 38 && !this.message) {
                event.preventDefault();
                this.message = this.lastMessage;
            }
        });
    },

    updated() {
        this.$refs.bottom.scrollIntoView({ behavior: 'smooth' });
    },

    methods: {
        sendMessage() {
            if (!this.message) return;
            this.lastMessage = this.message;

            this.ws.send(JSON.stringify({ op: 1, content: this.message }));
            this.message = '';
        }
    },
}
