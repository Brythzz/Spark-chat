import { post } from 'axios';
import Button from '../components/Button';


//////////////////////////////////////////////////
//  LOGIN
//////////////////////////////////////////////////

export default {
    props: ['user', 'setUser'],

    data() {
        return {
            err: null,
            username: '',
            password: ''
        };
    },

    render() {
        return (
            <div class="container">
                <form onSubmit={ (event) => { event.preventDefault(); this.login() }}>
                    <input v-model={ this.username } type="text" placeholder="Identifiant / Email" autocomplete="username" maxlength="32"/>
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
                .then((res) => {
                    this.setUser(res.data);
                    this.$router.push('app');
                })
                .catch(req => this.err = this.getErrorFromHttpStatus(req.response.status));
        }
    }
}
