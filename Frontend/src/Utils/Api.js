import { getItem, setItem } from '../Utils/StorageHelper'

export async function checkLogin(username, password) {
    const response = await fetch(`https://ask-auth.now.sh/users/${username}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password })
    }).then((res) => res.json())

    return response
}

export async function checkRegistration(username, password) {
    const result = await fetch("https://ask-auth.now.sh/users", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
    }).then((res) => res.json())

    return result
}

export async function getAllQuestions() {
    const result = await fetch('https://ask-question.now.sh/questions', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': getItem('token')
        },
    }).then((res) => res.json())

    return result.data.questions
}

export async function getQuestionsUser(username) {
    const result = await fetch(`https://ask-question.now.sh/questions/${username}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': getItem('token')
        },
    }).then((res) => res.json())

    return result.data.questions
}

export async function checkToken() {
    const check = await fetch("https://ask-auth.now.sh/authentication", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': getItem('token'),
        }
    }).then(res => res.json())

    if (check.ok) {
        return
    }

    const result = await fetch(`https://ask-auth.now.sh/users/${getItem('username')}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: getItem('password') })
    }).then((res) => res.json())

    setItem('token', result.data.token)
}

export async function updateQuestion(id, answer) {
    const result = await fetch(`https://ask-question.now.sh/questions/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': getItem('token')
        },
        body: JSON.stringify({ answer: answer })
    }).then((res) => res.json())

    return result
}

export async function addQuestion(question, author, username, date) {
    const result = await fetch('https://ask-question.now.sh/questions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': getItem('token'),
        },
        body: JSON.stringify({ username: username, author: author, question: question, date: date })
    }).then((res) => res.json())

    return result
}

