var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {

    $scope.loading = false;
    //	$scope.sampleText = "Today is such a lovely day. Bright and sunny, light breeze blowing and warm. On top of it, it's a Sunday. I am planning to take my car out for a spin to soak up the lovely sunshine and breeze through traffic free Sunday roads. Well, relatively traffic free. It has been a hectic week and I need to unwind with some awesome music on my car theater. Also need to buy me a new pair of jeans and maybe catch the horror flick at the mall. I so love horror movies. I am thinking I might also grab some caramel popcorn at the theater, oh they are do delicious!!";
    $scope.sampleText = "Your literature review should be appropriate to the kind of paper you are writing. If it is a thesis, you should strive for completeness, both in reviewing all the relevant literature and in making the main arguments clear to a reader who is unfamiliar with that literature. For a course paper or journal article, it is sufficient to review the main papers that are directly relevant. Again, you should assume that your reader has not read them, but you need not go into detail. You should review only those points that are relevant to the arguments you will make. Do not say that ``X found Y'' or ``demonstrated'' if X's conclusions don't follow from X's results. You can use words like ``X claimed to show that Y'' or ``suggested that'' when you are not sure. If you see a flaw, you can add, ``However ...''. Try to avoid expressions like ``Unfortunately, Smith and Jones neglected to examine [precisely what you are examining].'' It might have been unfortunate for them or for the field, but it is fortunate for you, and everyone knows it.";
    //var url = "https://apikey:KQSNCqMJYiVum7WRpibjSHgVd1MV0PisDx7MuO4PLAb9@gateway-syd.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=Team%2C%20I%20know%20that%20times%20are%20tough%21%20Product%20sales%20have%20been%20disappointing%20for%20the%20past%20three%20quarters.%20We%20have%20a%20competitive%20product%2C%20but%20we%20need%20to%20do%20a%20better%20job%20of%20selling%20it%21";

    $scope.tone = false;
    $scope.chattone = false;
    $scope.AnalyseTone = function(content) {
        //  alert($scope.address);
        if (!content || content.length < 4) {
            alert("Not Enough Words!")
            return;
        }
        $scope.showResult = false;
        $scope.loading = true;
        $scope.errorMsg = '';
        $scope.res = '';
        var url = "https://sujoy-watson-ai-app.cfapps.io//tone?text=" + content;
        //var url = "http://localhost:3000/tone?text=" + content;
        $http({
            method: "GET",
            url: url
        }).then(function mySucces(response) {
            console.log(JSON.stringify(response));
            $scope.response = response.data.document_tone;
            if (!response.data.document_tone.tones || response.data.document_tone.tones.length == 0) {
                $scope.res = "No emotion detected";
                showResult = false;
            }
            $scope.resultsReady = true;
            $scope.loading = false;
            $scope.showResult = true;
            if (response.data.hasOwnProperty('error')) {
                $scope.errorMsg = response.data.error;
                $scope.LOL = true;
                console.log($scope.errorMsg);
            }
        }, function myError(response) {
            $scope.response = response;
            $scope.loading = false;
        });
    };

    $scope.AnalyseChatTone = function(content) {
        //  alert($scope.address);
        if (!content || content.length < 4) {
            alert("Not Enough Words!")
            return;
        }
        $scope.showResult = false;
        $scope.loading = true;
        $scope.errorMsg = '';
        var url = "https://sujoy-watson-ai-app-neurogliac-underminer.cfapps.io/tone?text=" + content;
        //var url = "http://localhost:3000/chat?text=" + content;
        $http({
            method: "GET",
            url: url
        }).then(function mySucces(response) {
            console.log(JSON.stringify(response));
            $scope.response = response.data;
            $scope.chattone = true;
            $scope.loading = false;
            $scope.showResult = true;
            if (response.data.hasOwnProperty('error')) {
                $scope.errorMsg = response.data.error;
                console.log($scope.errorMsg);
            }
        }, function myError(response) {
            $scope.response = response;
            $scope.loading = false;
        });
    };
});