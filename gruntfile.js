module.exports=function(grunt){

	grunt.initConfig({
  		watch: {
   			express: {
     			files:  [ 'serverStart.js' ],
      			tasks:  [ 'express:dev' ],
     				options: {
        				spawn: false 
     				}
    		},
    		pug:{
    			files:['views/**'],
    			options:{
    				livereload:true
    			}
    		}
  		},

  		express: {
      		options: {
        
     		 },
      		dev: {
        		options: {
         			script: 'serverStart.js'
        		}
      		}
   		}
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['express:dev','watch']);
};