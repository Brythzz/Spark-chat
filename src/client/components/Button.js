
//////////////////////////////////////////////////
//  BUTTON
//////////////////////////////////////////////////

export default {
    props: ['content'],

    render({ content }) {
        return (
            <button type="submit">{ content }
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.96 37"><path d="M50.96 18.5L32.45 37h-9.9l14.99-15H0v-7h37.54L22.55 0h9.9l18.51 18.5z"/></svg>
            </button>
        );
    }
}
