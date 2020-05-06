import Axios from 'axios';
import {token} from '../authentication/AuthProvider';

const ENDPOINT = "http://10.0.2.2:3000/";

export function createPoint(lat, long, title, desc, image){
    console.log(lat);
    console.log(long);
    console.log(title);
    console.log(desc);
    console.log(image[50]);
    console.log(token);
    return Axios.post(`${ENDPOINT}issue`, {title: title, description: desc, lat: lat, long: long, imagePath: image}, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
            return true;
        })
        .catch(err => {
            console.error(err.message);
            return false;
        })

}