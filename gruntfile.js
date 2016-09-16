//test if it added 
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
          files:['./app/views/**'],
          options:{
            livereload:true
          }
        },
        js:{
          files:['./app/model/**', './app/controller/**','./config/**','./app/public/**'],
          options:{
            liverelosd:true
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
