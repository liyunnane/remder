var reminder=angular.module('reminder',[]);
reminder.controller('myCtrl',[
    '$scope',
    function($scope){
        //从localstorage中取数据
        if(localStorage._reminder){
            $scope.singles=JSON.parse(localStorage._reminder);
        }else{
            $scope.singles=[];
        }
        //往localstorage中存数据
        $scope.save=function(){
            localStorage._reminder=JSON.stringify($scope.singles);
        }

        //初始化currentlist和currenttodo
        if($scope.singles.length==0){
           $scope.currentlist;
           $scope.currenttodo;
          }else{
            $scope.currentlist=$scope.singles[0];
            if($scope.currentlist.todos.length==0){
                $scope.currenttodo;
                     }else{
                $scope.currenttodo=$scope.currentlist.todos[0];
           }
         }

        $scope.themes=['orange','purple','brown','red','green','yellow','blue'];
        //添加左侧列表条数
        $scope.add=function(){
            if($scope.singles.length==0){
                var id=1;
            }else{
                var min=-Infinity;
                for(var i=0;i<$scope.singles.length;i++){
                    if($scope.singles[i].id>min){
                        min=$scope.singles[i].id;
                    }
                }
                var id=min+1;
            }
            $scope.newlist={
                id:id,
                title:'列表'+(($scope.singles.length)+1),
                theme:$scope.themes[($scope.singles.length)%7],
                todos:[],
            }
            $scope.singles.push($scope.newlist);
            console.table($scope.singles)
        }
        //创建当前列表
        $scope.setcurrent=function(i){
            $scope.currentlist=$scope.singles[i];
        }
        // 创建当前的todo
        $scope.setcurrenttodo=function(aa){
            console.table($scope.currentlist.todos)
            for(var i=0;i<$scope.currentlist.todos.length;i++){
                if($scope.currentlist.todos[i].id==aa){
                    $scope.currenttodo=$scope.currentlist.todos[i];
                }
            }
        }
        //添加具体的todo
        $scope.addxinxi=function(){
            if($scope.currentlist.todos.length==0){
                var id=1;
            }else{
                var min=-Infinity;
                for(var i=0;i<$scope.currentlist.todos.length;i++){
               if($scope.currentlist.todos[i].id>min){
                   min=$scope.currentlist.todos[i].id;
               }
            }
                var id=min+1;
            }

            var newtodo={id:id,name:'',isDone:false}
            $scope.currentlist.todos.push(newtodo);
            $scope.currenttodo=newtodo;
        }

        //删除列表
        $scope.delete=function(m){
            var arr=[];
            var length=$scope.singles.length;
            for(var i=0;i<length;i++){
               if($scope.singles[i].id!=m){
                   arr.push($scope.singles[i]);
               }
            }
            $scope.singles=arr;
            var index;
            for(var i=0;i<$scope.singles.length;i++){
                if($scope.singles[i].id==m+1){
                    index=i
                }
            }
            if(index!='undefined'){
                $scope.currentlist=$scope.singles[index];
            }else{
                $scope.currentlist=null;
            }
        }
        //阻止冒泡
        $scope.clearbubble=function(e){
            e.stopPropagation();
        }
        //删除todo
        $scope.remove=function(aa){
            var bb;
            for(var i=0;i<$scope.currentlist.todos.length;i++){
                if($scope.currentlist.todos[i].id==aa){
                    bb=i;
                }
            }
            $scope.currentlist.todos.splice(bb,1);
        }  
    }])