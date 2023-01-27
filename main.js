let $todoInput //miejsce, gdzie uzytkownik wpisuje treść
let $alertInfo // info o braku zadań / konieczności dodania tekstu
let $addBtn // przycisk ADD --dodaje nowy element do listy
let $ulList //nasz lista zadań <ul></ul>
let $newTask //nowo dodane Li

let $popup //pobrany popup
let $popupInfo //alert w popucie,jak sie doda pusty tekst
let $editedTodo //edytowany Todo
let $popupInput // tekst wpisywany w inputa w popup
let $addPopupBtn // przcisk zatwiersz w popup
let $closeTodoBtn // przycisk od zamykania popup

let $idNumber = 0
let $allTasks //pobiera wszytkie li

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

//download our elements
const prepareDOMElements = () => {
	$todoInput = document.querySelector('.todoInput')
	$alertInfo = document.querySelector('.alertInfo')
	$addBtn = document.querySelector('.addBtn')
	$ulList = document.querySelector('.todoList ul')

	$popup = document.querySelector('.popup')
	$popupInfo = document.querySelector('.popupInfo')
	$popupInput = document.querySelector('.popupInput')
	$addPopupBtn = document.querySelector('.accept')
	$closeTodoBtn = document.querySelector('.cancel')
	$allTasks = $ulList.getElementsByTagName('li') //interesting
}

//add overhearing(nadsluchiwanie)
const prepareDOMEvents = () => {
	$addBtn.addEventListener('click', addNewTask)
	$ulList.addEventListener('click', checkClick)
	$closeTodoBtn.addEventListener('click', closePopup)
	$addPopupBtn.addEventListener('click', changeTodo)

	$todoInput.addEventListener('keyup', enterCheck)
}

//dodajemy elemnt do listy
const addNewTask = () => {
	if ($todoInput.value !== '') {
		$idNumber++
		$newTask = document.createElement('li')
		$newTask.innerText = $todoInput.value
		$newTask.setAttribute('id', `todo-${$idNumber}`)
		$ulList.appendChild($newTask)

		$todoInput.value = ''
		$alertInfo.innerText = ''
		createToolsArea()
	} else {
		$alertInfo.innerText = 'Wpisz treść zdania!'
	}
}

const enterCheck = () => {
	if (event.keyCode === 13) {
		addNewTask()
	}
}

// tworzymy przyciski edycji, usuwania i 'gotowe'
const createToolsArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	$newTask.appendChild(toolsPanel)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.innerText = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.appendChild(completeBtn)
	toolsPanel.appendChild(editBtn)
	toolsPanel.appendChild(deleteBtn)
}
//even - e
// zarządzanie kliknięciem na przyciski
const checkClick = (e) => {
	if (e.target.closest('button').classList.contains('complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.closest('button').classList.toggle('completed')
	} else if (e.target.closest('button').className === 'edit') {
		editTask(e)
	} else if (e.target.closest('button').className === 'delete') {
		deleteTask(e)
	}
}

//editing task
const editTask = (e) => {
	const oldTodo = e.target.closest('li').id
	$editedTodo = document.getElementById(oldTodo)
	$popupInput.value = $editedTodo.firstChild.textContent

	$popup.style.display = 'flex'
}

// sprawdzanie czy popup nie jest pusty i zmienianie treść zadania
const changeTodo = () => {
	if ($popupInput.value !== '') {
		$editedTodo.firstChild.textContent = $popupInput.value
		$popup.style.display = 'none'
		$popupInfo.innerText = ''
	} else {
		$popupInfo.innerText = 'Musisz podać jakąś treść!'
	}
}

//close popua
const closePopup = () => {
	$popup.style.display = 'none'
	$popupInfo.innerText = ''
}

//usuwanie zadania
const deleteTask = (e) => {
	const deleteTodo = e.target.closest('li')
	deleteTodo.remove()

	if ($allTasks.length === 0) {
		$alertInfo.innerText = 'Brak zadań na liście'
	}
}

document.addEventListener('DOMContentLoaded', main) //interesting
