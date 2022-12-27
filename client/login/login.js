import { query } from '../glob.js';

document.oninput = function() {
    const input = document.querySelector('#phone');
    input.value = input.value.replace(/[^\\+\d]/g, '');
}
document.querySelector("#butt").disabled = true;
const input = document.querySelector("#phone"),
    errorMsg = document.querySelector("#error-msg"),
    validMsg = document.querySelector("#valid-msg");

const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
intlTelInput(input, {
    utilsScript: '../node_modules/intl-tel-input/src/js/utils',
});

const iti = window.intlTelInput(input, {
    utilsScript: "../../build/js/utils.js?1638200991544"
});
const reset = function() {
    input.classList.remove("error");
    errorMsg.classList.add("hide");
    validMsg.classList.add("hide");
};

input.addEventListener('keyup', function() {
    reset();
    let inputValue = input.value.trim()
    if(!inputValue){
        validMsg.innerHTML = "";
        document.querySelector("#butt").disabled = true;
    }
    if (inputValue) {
        if (iti.isValidNumber()) {
            validMsg.classList.remove("hide");
            validMsg.innerHTML = 'Correct'
            errorMsg.innerHTML = ''
            document.querySelector("#butt").disabled = false;
        } else {
            input.classList.add("error");
            const errorCode = iti.getValidationError();
            errorMsg.innerHTML = errorMap[errorCode];
            validMsg.innerHTML = ''
            if(!errorMap[errorCode]) {
                return errorMsg.innerHTML = 'Incorrect'
            }
            errorMsg.classList.remove("hide");
            validMsg.innerHTML = ''
            document.querySelector("#butt").disabled = true;
        }
        if (inputValue.match(/[\\+]/gi)){
            if (inputValue.match(/[\\+]/gi).length > 1) {
                document.querySelector("#butt").disabled = true;
                validMsg.innerHTML = ''
                errorMsg.innerHTML = 'Too many +'
            }
        }
        if(inputValue.slice(0,1) !== '+') {
            document.querySelector("#butt").disabled = true;
            validMsg.innerHTML = ''
            errorMsg.innerHTML = 'First should be +'
        }
    }
});

$(document).ready(function() {
    $('#butt').on('click', async function() {
        const phone = $('#phone').val();
        const codeLabel = $('#verify');
        const loginLabel = $('#login');
        loginLabel.css('display', 'none')
        codeLabel.css('display', 'block')
        await query({ url: '/verify', data: { phone } })
    });

    $('#verifybutt').on('click', async function() {
        const phone = $('#phone').val();
        const code = $('#code').val();

        const data = await query({ url: '/login', data: { code, phone } })

        data.message === 'Good Message' ?
            window.location.href = "/" :
            alert('Server ERROR')
    });
})

