import { post, get } from 'axios';
import Button from '../components/Button';


//////////////////////////////////////////////////
//  LOGIN
//////////////////////////////////////////////////

export default {
    data() {
        return {
            err: null,
            username: '',
            password: ''
        };
    },

    render() {
        // TODO: Add input autocomplete and misc properties
        return (
            <div class="container">
                <form onSubmit={ (event) => { event.preventDefault(); this.login() }}>
                    <input v-model={ this.username } type="text" placeholder="Identifiant / Email" autocomplete="username" />
                    <input v-model={ this.password } type="password" placeholder="Mot de passe" autocomplete="current-password" />
                    {this.err && <p class="error">{ this.err }</p>}
                    <Button content="Se connecter" />
                </form>
                <router-link to="/register">Se créer un compte</router-link>
            </div>
        );
    },

    methods: {
        getErrorFromHttpStatus(code) {
            const error = (code === 401)
                ? 'Identifiants invalides'
                : 'Il y\'a eu un problème. Veuillez réessayer plus tard';

            return error;
        },

        login() {
            const { username, password } = this;
            const areAllFieldsCompleted = username && password;

            if (!areAllFieldsCompleted) return this.err = 'Veuillez remplir tous les champs';

            post('/api/v1/login', { username, password })
                .then(() => this.$router.push('app'))
                .catch(req => this.err = this.getErrorFromHttpStatus(req.response.status));
        }
    }
}
