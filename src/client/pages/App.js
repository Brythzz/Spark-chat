
//////////////////////////////////////////////////
//  APP
//////////////////////////////////////////////////

export default {

    data() {
        return {
            user: null
        };
    },

    render({ user }) {
        return <router-view setUser={ this.setUser } user={ user } />;
    },

    created() {
        window.localStorage.getItem('lightmode')
            && document.getElementsByTagName('body')[0].classList.add('spark')
    },

    methods: {
        setUser(user) {
            this.user = user;
            window.localStorage.setItem('user', JSON.stringify(user));
        }
    }
}
