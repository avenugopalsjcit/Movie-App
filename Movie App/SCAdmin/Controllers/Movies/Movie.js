app.factory('MovieGridFactory', function ($http) {

    var MovieGridFactory = {};
    MovieGridFactory.GetMoviesGrid = function () {
         $(".pageLoaderOverlay").show();
        // return $http.get('https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=f90d8b6f90d04bb5bbbeb2f241155ce7&query=' +"star wars");
        return $http.get('https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=f90d8b6f90d04bb5bbbeb2f241155ce7&query=' + "the" + '&offset=0');

    }

    return MovieGridFactory;
});
app.controller('MovieCtrl', ['$scope', 'MovieGridFactory', 'NgTableParams', '$http', function ($scope, MovieGridFactory, NgTableParams,$http) {


    MovieGridFactory.GetMoviesGrid().success(function (data) {
    
        $scope.MoviesGrid = data.results;

        data = [];
        data = $scope.MoviesGrid


        if (data.length === 0) {


            $scope.showNodata = true;
            $('#tblAnnouncements').hide();
            $scope.Nodata = "There are no Announcement(s).";
        }
        else {

            $scope.showNodata = false;
            $scope.usersTable = new NgTableParams({}, { 'dataset': data });
            $(".pageLoaderOverlay").hide();
           
        }
    });

    $scope.getItems = function (search) {
        $http.get('https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=f90d8b6f90d04bb5bbbeb2f241155ce7&query=' +search  + '&offset=0', {}).success(function (data) {
            $scope.usersTable = new NgTableParams({}, { 'dataset': data.results });

                   });
        //var data = $http.get('https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=f90d8b6f90d04bb5bbbeb2f241155ce7&query=' +"star wars" + '&offset=0');
      
    }
}]);



















