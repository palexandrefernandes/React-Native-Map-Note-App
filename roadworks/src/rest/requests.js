import Axios from 'axios';
import {token} from '../authentication/AuthProvider';

const ENDPOINT = "http://10.0.2.2:3000/";

export function createPoint(token, lat, long, title, desc, image){
    return Axios.post(`${ENDPOINT}issue`, {title: title, description: desc, lat: lat, long: long, imagePath: image}, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
            return true;
        })
        .catch(err => {
            console.error(err.message);
            return false;
        })
}

export function getPoints(token){
    return Axios.get(`${ENDPOINT}issues`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
            return res.data.data;
        })
        .catch(err => {
            console.error(err.message);
            return false;
        })
}

export function getMyPoints(token){
    return Axios.get(`${ENDPOINT}user/issues`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
            return res.data.data;
        })
        .catch(err => {
            console.error(err.message);
            return false;
        })
}

export function deletePoint(token, id){
    return Axios.delete(`${ENDPOINT}issue/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err.message);
            return false;
        })
}

export function editPoint(token, id, title, description){
    console.log(token);
    return Axios.put(`${ENDPOINT}issue/${id}`, {title: title, description:description} ,{headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err.message);
            return false;
        })
}