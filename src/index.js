angular.module
('TodoApp', [])
.controller('TodoCtrl',
function($scope, $http) {
  $scope.test = 'The Coolest Todo List Tracker Ever!';
  $scope.todos = []
  var baseUrl = 'http://localhost:3000'
  $scope.addTodo = function () {
  $http.post(baseUrl + '/todos.json', {todo: {description: $scope.title, user_id: 1}})
    .then(
      function(success) {
        console.log(success.data);
        $scope.todos.push(success.data);
      },
      function(err) {
        console.log(err);
      })

      if(!$scope.title || $scope.title === '') { return; }
      $scope.title = '';
    };

    $http.get(baseUrl + '/todos.json')
    .then(function(success) {
      $scope.todos = success.data;
    },function(error) {
      console.log(error);
    })

    $scope.deleteTodo = function(todo){
      $http.delete(baseUrl + '/todos/' + todo.id + '.json')
      .then(function(success) {
        var index = $scope.todos.indexOf(todo);
        $scope.todos.splice(index, 1);
      }, function(error) {
        console.log(error);
      }
    )
  };

  $scope.removeAttribute = function () {
    var element = angular.element(document.querySelector('.inputArea'));
    element.attr('readonly', false);
  }
    // $scope.editTodo = function {
    //
    // }
});
