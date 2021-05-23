import { post, get } from 'axios';


//////////////////////////////////////////////////
//  SETTINGS MODAL
//////////////////////////////////////////////////

export default {
    props: ['close', 'user'],

    data() {
        return {
            userDetails: null
        }
    },

    render({ close, userDetails }) {
        return (
            <div class="settings">
                <div class="backdrop" onClick={ close }></div>
                <div class="modal">
                    <h3>Email</h3>
                    <span>{ userDetails.email }</span>

                    <h3>Nom d'utilisateur</h3>
                    <span>{ userDetails.username }</span>

                    <h3>Couleur</h3>
                    <span>{ userDetails.color }</span><span class="color" style={{ backgroundColor: userDetails.color }}></span>

                    {/* <pre>{ JSON.stringify(userDetails) }</pre> */}


                    <p class="link" onCLick={ this.switchTheme }>Changer de thème</p>
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
            document.getElementsByTagName('body')[0].classList.toggle('spark');

            const isLightmode = window.localStorage.getItem('lightmode');
            window.localStorage.setItem('lightmode', isLightmode ? '' : 'true');
        }
    }
}
