import { query } from './glob.js';

$(document).ready(function() {
    query({type: 'GET', url: '/getuser'})
        .then(data => $('h1').text(data))
        .catch(e => window.location.href = '/login')

        $('#logout').on('click', async function() {
            const data = await query({url: '/logout'})
            data.message === 'Session destroy' ?
                window.location.href = "/login" :
                alert('Server ERROR')
        })
})


