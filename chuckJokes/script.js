const jokeEle = document.getElementById('joke-content');
const jokeBtn = document.getElementById('joke-btn');

function generateJoke(){

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

    xhr.onreadystatechange = function() {
        if(this.readyState === 4){
            if(this.status === 200){
                 joke = JSON.parse(this.responseText).value;
                jokeEle.innerHTML = joke;
                console.log(joke);
            }else{
                jokeEle.innerHTML = "Something went wrong (Not Funnyy..!)";
            }
        }
    };

    xhr.send();
}
jokeBtn.addEventListener('click', generateJoke);
document.addEventListener('DOMContentLoaded', generateJoke);