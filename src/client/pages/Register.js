import { post } from 'axios';
import Button from '../components/Button';


//////////////////////////////////////////////////
//  REGISTER
//////////////////////////////////////////////////

export default {
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
            const error = (code === 403)
                ? 'Cette adresse email n\'est pas whitelistée'
                : 'Il y\'a eu un problème. Veuillez réessayer plus tard';

            return error;
        },

        register() {
            const { email, username, password } = this;
            const areAllFieldsCompleted = email && username && password;

            if (!areAllFieldsCompleted) return this.err = 'Veuillez remplir tous les champs';

            post('/api/v1/register', { email, username, password })
                .then(() => this.isLoggedIn = true)
                .catch(req => this.err = this.getErrorFromHttpStatus(req.response.status));
        }
    }
}
