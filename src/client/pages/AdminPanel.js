import { get } from 'axios';


//////////////////////////////////////////////////
//  ADMIN PANEL
//////////////////////////////////////////////////

export default {
    props: ['user', 'setUser'],

    data() {
        return {
            users: []
        };
    },

    render() {
        return (
            <div class="container chat admin">
                { this.users.map((user, index) =>
                        <div class="user" key={ index }>
                            <p style={{ color: user.color }}>{ user.username }</p>
                            <p>{ user.email }</p>
                        </div>
                )}

                <p onClick={ this.fetchUsers }>Refresh</p>
                <router-link to="/app">Go back</router-link>
            </div>
            
        );
    },

    created() {
        this.fetchUsers();
    },

    methods: {
        fetchUsers() {
            get('/api/v1/all')
            .then(res => this.users = res.data.filter((v, i, a) => a.findIndex(t => (t.username === v.username)) === i))
            .catch(() => this.$router.push('/login'));
        }
    }
}
