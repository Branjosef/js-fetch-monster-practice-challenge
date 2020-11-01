document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main (){
  fetchMonsters();
  newMonsterForm();
  eventListeners();
}

let page = 1
function fetchMonsters() {fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(resp => resp.json())    //need to remember to add the parentheses for json!
  .then(json => monsterIndex(json))
};

function monsterIndex(monsters){
  const monsterContainer = document.getElementById('monster-container');
  monsters.forEach(monster => {
    const divMonster = document.createElement('div')
    divMonster.dataset = monster.id
    divMonster.innerHTML = `<h2>${monster.name}</h2><p><strong>Age:</strong> ${monster.age}</p><p><strong>Bio:</strong>  ${monster.description}</p><p><strong>Monster ID: ${monster.id}</strong></p>`
    monsterContainer.appendChild(divMonster)
  })
}

function newMonsterForm() {
  const createMonster = document.getElementById('create-monster')
  createMonster.innerHTML = `<form class='add-monster-form'>
  <h3>Create New Monster</h3>
  <input type='text' name='name' value placeholder='Enter monster name...' class='input-text'>
  <input type='text' name='age' value placeholder='Enter age...' class='input-text'>
  <input type='text' name='description' value placeholder='enter description...' class='input-text'>
  <input type='submit' name='submit' value='Submit' class='submit'>
  </form>`
}

function eventListeners(){
const body = document.querySelector('body')
body.addEventListener('submit',function (event){
  event.preventDefault();
  addMonster(event);
});
body.addEventListener('click', function(event){
    pagination(event.target.id)
});
};

function addMonster(event){
  const formData = {
    name: event.target['name'].value,
    age: event.target['age'].value,
    description: event.target['description'].value
  }

  event.target.reset()

  const reqObj = {
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/monsters', reqObj) 
    .then(resp => resp.json())
    .then(monster => console.log(monster));
};

function pagination(target_id){ 
  if (target_id === 'forward'){
    page += 1
    fetchMonsters()
  } else if (target_id === 'back' && page > 1){
    page -= 1
    fetchMonsters()
  } else if (target_id === 'back' && page === 1) {
    alert('Aint no monsters here')
  }
};




