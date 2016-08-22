/*
* $scope.configs, $scope.branch and $scope.pluginConfig, among others are available from the parent scope
* */
app.controller('TemplateCtrl', ['$scope', function ($scope) {
  $scope.saving = false;

  var particle = new Particle();

  $scope.$watch('configs[branch.name].template.config', function (value) {
    console.log(value)
    $scope.config = value || {
      environment: 'Hi from `environment`',
      prepare: 'Hi from `prepare`',
      test: 'Hi from `test`',
      deploy: 'Hi from `deploy`',
      cleanup: 'Hi from `cleanup`'
    };
  });

  $scope.save = function () {
    $scope.saving = true;
    $scope.pluginConfig('particle', $scope.config, function (res) {
      console.log( res);
      $scope.saving = false;
    });
  };

  $scope.login = function () {
    console.log($scope.configs)
    particle.login({username: $scope.config.email, password: $scope.config.password}).then(
      function(data){
        console.log('API call completed on promise resolve: ', data.body.access_token);
      },
      function(err) {
        console.log('API call completed on promise fail: ', err);
      }
    );
  };

}]);
