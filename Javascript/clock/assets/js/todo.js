const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';



let toDos = []; 

//HTML li를 지우는 함수
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {  

        return toDo.id !== parseInt(li.id);   
    });
    toDos = cleanToDos                  // toDos 의 값이 변할 수 있는 let으로 변수 선언
    saveToDos();                        //toDos 저장
}


function saveToDos() {               //localstorage에 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function paintToDo(text) {
    const li = document.createElement("li"); 
    const delBtn = document.createElement("button"); 
    delBtn.innerText = "X"; 
    delBtn.addEventListener("click", deleteToDo); 
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span);  
    li.appendChild(delBtn); 
    li.id = newId; 
    toDoList.appendChild(li);
    const toDoObj = {
        text: text, 
        id: newId
    };
    toDos.push(toDoObj);                                        //toDos 배열안에 toDoObj 를 넣는다
    saveToDos();                                                    //배열을 추가한다음에 localstorage에 저장
}

function handleSubmit(event) {
    event.preventDefault();                                       //기존 submit 이벤트를 막음
    const currentValue = toDoInput.value;                         //input value값을 가져옴
    paintToDo(currentValue);
    toDoInput.value = "";                                           //input에 text를 쓰고 엔터를 눌렀을때 todo를 생성
}


// toDos를 가져와서 parse()로 string을 object로 변환해주고  paintToDo()라는 함수를 실행.
function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    if (loadToDos !== null) {   //toDos를 불러오는 작업
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function (toDo) {  //forEach는 배열에 담겨있는  함수를 한번씩 실행시켜준다.
            paintToDo(toDo.text);  //toDo.text 실행
        });
    }

}
function init() {
    loadToDos(); // load해 와야하는 함수
    toDoForm.addEventListener("submit", handleSubmit);  //값을 전송했을때 이벤트
}
init();