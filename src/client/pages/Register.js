import { post } from 'axios';
import Button from '../components/Button';


//////////////////////////////////////////////////
//  REGISTER
//////////////////////////////////////////////////

export default {
    props: ['user', 'setUser'],

    data() {
        return {
            isLoggedIn: false,
            err: null,
            email: '',
            username: '',
            password: ''
        };
    },

    render() {
        return (
            <div class="container">
                <form onSubmit={ (event) => { event.preventDefault(); this.register() }}>
                    <input v-model={ this.email } type="text" placeholder="Adresse email" />
                    <input v-model={ this.username } type="text" placeholder="Identifiant" />
                    <input v-model={ this.password } type="password" placeholder="Mot de passe" />
                    {this.err && <p class="error">{ this.err }</p>}
                    <Button content="S'inscrire" />
                </form>
                <router-link to="/login">Se connecter</router-link>
            </div>
        );
    },

    methods: {
        getErrorFromHttpStatus(code) {
            const errors = Object.freeze({
                403: 'Cet email n\'est pas whitelisté',
                409: 'Un compte associé à cet email/identifiant existe déjà'
            });

            return errors[code] || 'Il y\'a eu un problème. Veuillez réessayer plus tard';
        },

        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        register() {
            const { email, username, password } = this;
            const areAllFieldsCompleted = email && username && password;

            if (!areAllFieldsCompleted) return this.err = 'Veuillez remplir tous les champs';
            if (!this.validateEmail(email)) return this.err = 'Adresse email invalide';

            post('/api/v1/register', { email, username, password })
                .then((res) => {
                    this.setUser(res.data);
                    this.$router.push('app');
                })
                .catch(req => this.err = this.getErrorFromHttpStatus(req.response.status));
        }
    }
}
