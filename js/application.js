var createTask = function () {
  $.ajax({
    type: 'POST',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1286',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#taskInputID').val()
      }
    }),
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }); 
}
$(document).ready(function () {
updateTaskList();
});
//have a global variable set to the id then add a class to the button which you then add an event listener to
var updateTaskList = function() {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1286',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      // response is a parsed JavaScript object instead of raw JSON
      if ($('.toDoUL').children().length <= (response.tasks.length + 2)) {
      response.tasks.forEach(function (task) {
    //    for (var i = 0; i < response.tasks.length; i++) {
      //    var newTask = document.createElement("li");
        //  var newTaskP = document.createElement('p');
         // var newTaskButton = document.createElement('button');
          //newTaskP.innerHTML = task.content;
          //newTask.classList.add('task');
          //newTask.id = task.id;
          //newTaskButton.textContent = "Toggle Complete?";
          //newTaskButton.style.display = "inline-block";
          //newTaskButton.classList.add('taskButton');
          //newTaskP.style.display = "inline-block";
          //newTask.id = String(task.id);
          //newTask.append(newTaskP);
          //newTask.append(newTaskButton);

        //}
 $('.toDoUL').append('<li class="task" id="' + task.id + '"><p style="display: inline-block">' + task.content + '</p><button style="display: inline-block" class="taskButton" onclick="toggleCompleted(' + task.id + ', this)">' + (task.completed ? 'Completed' : 'Active') + '</button><button class="delete" onclick="deleteTask(' + task.id + ', this)">X</button></li>');
  //   $('.toDoUL').append(newTask);
      });
    }
    else {
      for (var i = 2; i < $('.toDoUL').children().length; i++) {
        $('.toDoUL').remove('.task');
      }
      response.tasks.forEach(function (task) {
        for (var i = 0; i < response.tasks.length; i++) {
          var newTask = document.createElement("li");
          newTask.innerHTML = task.content;
          newTask.classList.add('task');
        }
        $('.toDoUL').append(newTask);
      });
    }
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}


var toggleCompleted = function (id, element) {
  if (element.textContent == 'Active') {
  $.ajax({
    type: 'PUT',
       url: 'https://fewd-todolist-api.onrender.com/tasks/' + String(id) + '/mark_complete?api_key=1286',
       dataType: 'json',
       success: function (response, textStatus) {
       element.textContent = "Completed";
       },
       error: function (request, textStatus, errorMessage) {
         console.log(errorMessage);
       }
     });
    }
  else if (element.textContent == 'Completed') {
    $.ajax({
      type: 'PUT',
         url: 'https://fewd-todolist-api.onrender.com/tasks/' + String(id) + '/mark_active?api_key=1286',
         dataType: 'json',
         success: function (response, textStatus) {
           element.textContent = "Active";
         },
         error: function (request, textStatus, errorMessage) {
           console.log(errorMessage);
         }
       });
  }
}

var deleteTask = function (id, element) {
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + String(id) + '?api_key=1286',
    success: function (response, textStatus) {
      console.log(response);
      element.parentElement.remove();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}