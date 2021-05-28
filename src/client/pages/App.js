
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
        const themes = ['', 'sand', 'nord', 'gruvbox', 'lightsout'];

        const currentTheme = +window.localStorage.getItem('theme') || 0;
        document.getElementsByTagName('body')[0].className = themes[currentTheme];
    },

    methods: {
        setUser(user) {
            this.user = user;
            window.localStorage.setItem('user', JSON.stringify(user));
        }
    }
}
