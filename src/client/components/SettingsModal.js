import { post, get } from 'axios';


//////////////////////////////////////////////////
//  SETTINGS MODAL
//////////////////////////////////////////////////

export default {
    props: ['close', 'user'],

    data() {
        return {
            userDetails: {}
        }
    },

    render({ close, userDetails }) {
        return (
            <div class="settings">
                <div class="backdrop" onClick={ close }></div>
                <div class="modal">
                    <h3>Email</h3>
                    <span>{ userDetails?.email || '' }</span>

                    <h3>Nom d'utilisateur</h3>
                    <span>{ userDetails?.username || '' }</span>

                    <h3>Couleur</h3>
                    <span>{ userDetails?.color || '' }</span><span class="color" style={{ backgroundColor: userDetails.color }}></span>


                    <p class="link" onCLick={ this.switchTheme }>Changer de thème</p>
                    { userDetails?.admin && <router-link to="/admin">Admin panel</router-link> }
                    <p class="logout" onclick={ this.logout }>Se déconnecter</p>
                </div>
            </div>
        );
    },

    created() {
        this.userDetails = this.user || JSON.parse(window.localStorage.getItem('user'));

        if (!this.userDetails)
            get('/api/v1/user')
                .then(res => {
                    this.userDetails = res.data;
                    window.localStorage.setItem('user', JSON.stringify(res.data));
                })
                .catch(() => this.$router.push('login'));
    },

    methods: {
        logout() {
            post('/api/v1/logout');
            this.$router.push('/login');
        },

        switchTheme() {
            const themes = ['', 'sand', 'nord', 'gruvbox', 'lightsout'];

            let currentTheme = +window.localStorage.getItem('theme') || 0;
            currentTheme = (themes.length > currentTheme+1) ? currentTheme+1 : 0;

            window.localStorage.setItem('theme', currentTheme);
            document.getElementsByTagName('body')[0].className = themes[currentTheme];
        }
    }
}
