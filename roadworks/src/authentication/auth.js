import Axios from 'axios';

export default function login(email, password){
    return Axios.post('http://10.0.2.2:3000/users/auth', {email: email, password: password})
        .then(res => {
            return res.data.token;
        })
        .catch(err => {
            if(err.response.status == 403)
                return false;
            err;
        });
}