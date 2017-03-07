	
var gulp = require('gulp'),
    shell = require('node-powershell');

gulp.task('updateNodeTypings', function() {
  const ps = new shell({executionPolicy: 'Bypass', debugMsg: true, noProfile: true});

  ps.addCommand('./updateNodeTypings.ps1')
    .then(function(){
        return ps.invoke();
    })
    .then(function(output){
        console.log(output);
        ps.dispose();
    })
    .catch(function(err){
        console.log(err);
        ps.dispose();
    });
});