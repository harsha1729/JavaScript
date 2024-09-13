const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter');
const formBtn = document.getElementById('formBtn');
let iseditMode = false;



function addItemtoStorage(item){
    const items = getItemsfromStorage();
    
    items.push(item);
    

    localStorage.setItem('items', JSON.stringify(items));

}

function getItemsfromStorage(){
    let localItems = localStorage.getItem('items');
    

    if(localItems === null){
        return [];
    }else{
        return JSON.parse(localItems);
    }

}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';
    button.appendChild(icon);
    return button;
}

function displayPage(){
    items = getItemsfromStorage('items');
    items.forEach((item) => addItemtoDOM(item));
    // console.log(formBtn);
    
    resetUI();
}

function addItem(e){
    e.preventDefault();

    const items = getItemsfromStorage();
    const newItem = itemInput.value;

    if(items.indexOf(newItem) != -1){
        alert(`${newItem} already exists in the list..`);
        return;
    }
    
    if(newItem === ''){
        alert('Please add an item');
        return;
    }
    ////check for update
    if(iseditMode){
        const itemtoEdit = itemList.querySelector('.edit-mode');
        console.log("item to edit");
        console.log(itemtoEdit);
        removeItemfromStorage(itemtoEdit.textContent);
        // itemtoEdit.classList.remove('edit-mode');
        itemtoEdit.remove();
        iseditMode = false;
        
    }
    //add the items list in DOM
    addItemtoDOM(newItem);

    //add items to local storage

    addItemtoStorage(newItem);

    resetUI();
}

function addItemtoDOM(newItem){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);
    itemInput.value = '';
}


function removeItem(e){
    
    if(e.target.parentElement.classList.contains('remove-item')){
        const item = e.target.parentElement.parentElement;    
        if(confirm(`Are you sure you want to delete ${item.textContent}..?`)){
            
            item.remove();
            removeItemfromStorage(item.textContent);
            resetUI();
        }
    }else{
        setItemtoEdit(e.target);
    }
}

function removeItemfromStorage(item){
    let items = getItemsfromStorage();
    
    
    items = items.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(items));
    
}

function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if(itemName.indexOf(text) !== -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    });
}

function setItemtoEdit(item){

    itemList.querySelectorAll('li').forEach((i) => {
        i.classList.remove('edit-mode');
    })
    iseditMode = true;
    console.log(item);
    item.classList.add('edit-mode');
    // console.log(formBtn);
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update'
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
    

}
function clearAll(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items');
    resetUI();
}

function resetUI(){
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    iseditMode = false;
}
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayPage);

resetUI();