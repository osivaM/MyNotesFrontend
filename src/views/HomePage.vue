<template>
    <div class="home-container">
        <h1 class="title">MyNotes<span class="cursor">_</span></h1>
        <p class="description">
            the <span class="highlight">MyNotes</span> project is designed to create<br>and conveniently manage notes and
            catalog them.
        </p>
        <form @submit.prevent="login" class="login-form">
            <div class="form-group">
                <label for="username">username ></label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div class="form-group">
                <label for="password">password ></label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit" class="login-button">login</button>
        </form>
        <div class="registration-and-github-buttons">
            <button @click="redirectToTelegram" class="registration-and-github-button telegram-button">Registration</button>
            <button @click="redirectToGitHub" class="registration-and-github-button github-button">GitHub</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            username: '',
            password: '',
            token: ''
        };
    },
    setup() {
        const router = useRouter();

        return { router };
    },
    methods: {
        redirectToTelegram() {
            window.open('https://t.me/my_notes_project_bot', '_blank');
        },
        redirectToGitHub() {
            window.open('https://github.com/osivaM/MyNotes', '_blank');
        },
        async login() {
            try {
                const response = await axios.post('http://localhost:8080/api/authentication/login', {
                    username: this.username,
                    password: this.password
                });

                this.token = response.data.token;
                localStorage.setItem('token', this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

                const decodedToken = jwtDecode(this.token);
                const rolesName = decodedToken.roles.map(item => item.authority);

                if (rolesName.includes('ADMIN')) {
                    this.router.push('/adimn/dashboard');
                } else if (rolesName.includes('USER')) {
                    this.router.push('/dashboard');
                }
            } catch(error) {
                console.error('Login failed: ', error);
            }
        }
    }
};
</script>

<style scoped>
.home-container {
    padding-top: 4vh;
    padding-left: 2vw;
}

.cursor {
    display: inline-block;
    animation: blink 1s step-start infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

.highlight {
    font-size: 1.2em;
    text-decoration: underline;
}

.login-form {
    max-width: 400px;
    margin-bottom: 20px;
}

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

label {
    flex: 0 0 120px;
    margin-right: 10px;
    text-align: left;
}

input[type="text"],
input[type="password"] {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #17181b;
    color: #dbdee4;
    font-family: 'better-vcr-5.4', sans-serif;
}

.login-button {
    width: 100%;
    padding: 10px;
    background-color: #384c61;
    color: #dbdee4;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 1.3em;
    cursor: pointer;
    font-family: 'better-vcr-5.4', sans-serif;
}

.login-button:hover {
    background-color: #306aa8;
}

.registration-and-github-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    max-width: 400px;
    height: 41px;
}

.registration-and-github-button {
    flex: 1;
    padding: 10px;
    font-size: 0.9em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'better-vcr-5.4', sans-serif;
    height: 100%;
}

.telegram-button {
    background-color: #0088cc;
    color: white;
    margin-right: 10px;
}

.github-button {
    background-color: #333;
    color: white;
}
</style>