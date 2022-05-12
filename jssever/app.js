
var courseApi = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);
    handleCreateForm();
}
start();

//Functions
function getCourses(callback){
    fetch(courseApi)
        .then(function(response)
        {
            return response.json();
        }
        )
        .then(callback);
}
function renderCourses(courses)
{
var listCoursesBlock =
    document.querySelector('#list-courses');
var html = courses.map(function(course)
    {
        return `
        <li class="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
   
        </li>
        `;
    }
    );
    listCoursesBlock.innerHTML = html.join('');
}

function handleCreateForm()
{
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function()
    {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        }
        createCourse(formData, function(){
            getCourses(renderCourses);
        });

    }
}
function createCourse(data,callback)
{
   var option = {
       method: 'POST',
       body : JSON.stringify(data),
       headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
   };
   fetch(courseApi,option)
        .then(function(response){
            response.json();
        })
        .then(callback);

}
function handleDeleteCourse(id){
    var option = {
        method: 'DELETE',
        headers: {
         'Content-Type': 'application/json'
         // 'Content-Type': 'application/x-www-form-urlencoded',
       }
    };
    fetch(courseApi + '/' + id,option)
         .then(function(response){
             response.json();
         })
         .then(function(){
            var courseItem = document.querySelector('.course-item'+id);
            if (courseItem){
                courseItem.remove();
            }
         });
}
// 
