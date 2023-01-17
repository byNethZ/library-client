import { ICredentials } from "../models/interface";
import global from "./globals";

const token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'mode':'cors'
}


export async function login(credentials: ICredentials) {
    try {
        const response = await fetch(`${global.urlApi}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'mode':'cors'
            },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return new Error(`Error: ${error}`)
    }
}

export async function index(endpoint: string){

    try {
        const response = await fetch(endpoint, {
            method: 'GET', 
            headers: headers
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return new Error(`Error: ${error}`)
    }
}

export async function show(endpoint: string){

    try {
        const response = await fetch(endpoint, {
            method: 'GET', 
            headers: headers
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return new Error(`Error: ${error}`)
    }
}

export async function store(endpoint: string, body: any){

    try {
        const response = await fetch(endpoint, {
            method: 'POST', 
            headers: headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return new Error(`Error: ${error}`)
    }
}

export async function put(endpoint: string, body: any){

    try {
        const response = await fetch(endpoint, {
            method: 'PUT', 
            headers: headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return new Error(`Error: ${error}`)
    }
}

export async function destroy(endpoint: string){

    try {
        const response = await fetch(endpoint, {
            method: 'DELETE', 
            headers: headers
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return new Error(`Error: ${error}`)
    }
}

///borrow/{id}/{status}
export async function borrow(endpoint: string, body: any){

    try {
        const response = await fetch(endpoint, {
            method: 'POST', 
            headers: headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return new Error(`Error: ${error}`)
    }
}