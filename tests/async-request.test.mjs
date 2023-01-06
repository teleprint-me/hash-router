/* hash-router/tests/async-request.test.mjs */
import { AsyncRequest } from '../static/modules/async-request.mjs';

const asyncRequest = new AsyncRequest();

const attachTestResult = (selector, result, message) => {
    const block = document.querySelector(selector);
    const res = document.createElement('span');
    const mes = document.createElement('span');
    if (result) {
        res.style = 'color: var(--success)';
    } else {
        res.style = 'color: var(--danger)';
    }
    res.innerText = result;
    mes.innerText = message;
    block.appendChild(res);
    block.appendChild(mes);
};

const testGetMethod = async () => {
    const url = '/static/views/profile.html';
    const response = await asyncRequest.get(url);
    const result = typeof response === 'string';
    const message = 'get method returns text response';
    console.assert(result, message);
    attachTestResult('#test-get-method', result, message);
};

const testGetMethodJSON = async () => {
    const url = 'https://reqres.in/api/unknown';
    const response = await asyncRequest.get(url, 'json');
    const result = typeof response === 'object';
    const message = 'get method returns json response';
    console.assert(result, message);
    attachTestResult('#test-get-method-json', result, message);
};

const testTemplateMethod = async () => {
    const url = '/static/views/profile.html';
    const template = await asyncRequest.template(url);
    const result = template instanceof HTMLTemplateElement;
    const message = 'template method returns a template element';
    console.assert(result, message);
    attachTestResult('#test-template-method', result, message);
};

const testStyleMethod = async () => {
    const url = '/static/styles/root.css';
    const style = await asyncRequest.style(url);
    const result = style instanceof HTMLStyleElement;
    const message = 'style method returns a style element';
    console.assert(result, message);
    attachTestResult('#test-style-method', result, message);
};

testGetMethod();
testGetMethodJSON();
testTemplateMethod();
testStyleMethod();
