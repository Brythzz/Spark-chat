import Message from '../components/Message';
import SettingsModal from '../components/SettingsModal';


//////////////////////////////////////////////////
//  CHAT
//////////////////////////////////////////////////

export default {
    props: ['user', 'setUser'],

    data() {
        return {
            messages: [],
            message: '',
            lastMessage: '',
            showSettingsModal: false
        };
    },

    render({ user }) {
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
                <div class="settingsButton" onClick={ this.toggleSettingsModal }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M8.82 5.49A3.716 3.716 0 0 0 8.856 5a3.716 3.716 0 0 0-.036-.49l1.08-.825a.248.248 0 0 0 .062-.32l-1.023-1.73a.26.26 0 0 0-.227-.125.249.249 0 0 0-.087.015l-1.28.5a3.769 3.769 0 0 0-.869-.49L6.281.21A.248.248 0 0 0 6.029 0H3.973a.25.25 0 0 0-.252.21l-.2 1.325a3.962 3.962 0 0 0-.869.49l-1.28-.5a.3.3 0 0 0-.092-.015.255.255 0 0 0-.221.125L.036 3.365a.242.242 0 0 0 .061.32l1.085.825a3.78 3.78 0 0 0-.036.49 3.78 3.78 0 0 0 .036.49L.1 6.315a.248.248 0 0 0-.061.32l1.028 1.73a.257.257 0 0 0 .226.125.241.241 0 0 0 .087-.015l1.28-.5a3.769 3.769 0 0 0 .869.49l.2 1.325a.25.25 0 0 0 .252.21h2.048a.248.248 0 0 0 .252-.21l.2-1.325a3.962 3.962 0 0 0 .869-.49l1.28.5a.3.3 0 0 0 .093.015.257.257 0 0 0 .221-.125l1.028-1.73a.248.248 0 0 0-.062-.32zM7.8 4.635A2.671 2.671 0 0 1 7.828 5a3.72 3.72 0 0 1-.025.365l-.072.565.457.35.555.42-.36.6-.652-.25-.531-.21-.463.34a3.022 3.022 0 0 1-.642.365l-.545.215-.082.565L5.361 9h-.72l-.1-.675-.08-.565-.544-.215a2.953 2.953 0 0 1-.633-.355l-.467-.35-.545.215-.653.255-.36-.6.555-.42.458-.35-.072-.57L2.174 5a3.561 3.561 0 0 1 .026-.365l.072-.565-.458-.35-.555-.42.36-.6.653.255.534.21.463-.34a3.046 3.046 0 0 1 .642-.365l.545-.215.083-.565.102-.68h.715l.1.675.083.565.545.215a2.946 2.946 0 0 1 .632.355l.468.35.544-.215.653-.255.36.605-.55.425-.457.35zM5 3a2.028 2.028 0 0 0-2.055 2A2.028 2.028 0 0 0 5 7a2.028 2.028 0 0 0 2.057-2A2.028 2.028 0 0 0 5 3zm0 3a1 1 0 1 1 1.029-1A1.018 1.018 0 0 1 5 6z" fill="currentColor"/></svg>
                </div>

                { this.showSettingsModal && <SettingsModal close={ this.toggleSettingsModal } user={ user } /> }
            </div>
        );
    },

    created() {
        let heartbeat;
        const WebSocketURL = `ws://${window.location.host}/ws`;

        this.ws = new WebSocket(WebSocketURL);

        this.ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            switch(data.op) {
                case 0:
                    this.messages.push(data.d);
                    break;

                case 2:
                    heartbeat = setInterval(() => {
                        this.ws.send('{"op":3}');
                    }, data.d);
                    break;

                default:
                    break;
            }
        }

        this.ws.onclose = () => {
            clearInterval(heartbeat);
            this.ws = new WebSocket(WebSocketURL);
        }
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
        if (this.showSettingsModal === false)
            this.$refs.bottom.scrollIntoView({ behavior: 'smooth' });
    },

    methods: {
        sendMessage() {
            if (!/\S/.test(this.message)) return;
            this.lastMessage = this.message;

            this.ws.send(JSON.stringify({ op: 1, content: this.message }));
            this.message = '';
        },

        toggleSettingsModal() {
            this.showSettingsModal = !this.showSettingsModal;
        }
    },
}
