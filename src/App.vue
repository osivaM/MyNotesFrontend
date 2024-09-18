<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style>
@font-face {
	font-family: 'better-vcr-5.4';
	src: url('./assets/fonts/better-vcr-5.4.ttf');
	font-weight: normal;
	font-style: normal;
}

body {
	line-height: 1.4;
	font-family: 'better-vcr-5.4', sans-serif;
	color: #dbdee4;
	background-color: #282c34;
}

.create-category-form,
.create-note-form,
.edit-note-form {
    max-width: 400px;
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
input[type="password"],
textarea {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #17181b;
    color: #dbdee4;
	font-family: 'better-vcr-5.4', sans-serif;
}

.error-message {
  color: red;
  margin-top: 5px;
}

.is-invalid {
  border-color: red;
}

.select-category-button,
.select-note-button {
    width: 70%;
    margin: 10px;
    padding: 10px;
    background-color: #384c61;
    color: #dbdee4;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 1.3em;
    cursor: pointer;
    font-family: 'better-vcr-5.4', sans-serif;
}

.menu-button,
.create-button,
.save-button {
	width: 90%;
	padding: 10px;
	margin: 10px;
	background-color: #3368a1;
	color: #dbdee4;
	border: 2px solid #ccc;
	border-radius: 4px;
	font-size: 1.3em;
	cursor: pointer;
	font-family: 'better-vcr-5.4', sans-serif;
}

.menu-button:hover,
.create-button:hover {
	background-color: #306aa8;
}

.logut-button {
    width: 10%;
	padding: 10px;
	margin: 10px;
	background-color: #384350;
	color: #dbdee4;
	border: 2px solid #ccc;
	border-radius: 4px;
	font-size: 1.3em;
	cursor: pointer;
	font-family: 'better-vcr-5.4', sans-serif;
}
</style>
