// 包装函数
module.exports = function(grunt){

    // 任务配置，所有插件的配置信息
    grunt.initConfig({

        // 获取 package.json 的信息
        pkg: grunt.file.readJSON('package.json'),

        //jshint插件的配置信息
        jshint: {
            build: [ 'Gruntfile.js', 'src/*.js'],
            options: {
                jshintrc: '.jshintrc'
                /*browser: true,
                devel: true*/
            }
        },

        //uglify插件的配置信息
        uglify: {
            options: {
                stripBanners: true,
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/test.js',
                dest: 'bulid/js/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
            }
        },

        //csslint插件的配置信息
        csslint:{
            build:['src/*.css'],
            options:{
                csslintrc:'.csslintrc'
            } 
        },

        //压缩css
        //压缩css  
        cssmin: {  
            //文件头部输出信息  
          main:{  
            options: {  
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                paths:["css"],  
                //美化代码  
                beautify: {  
                    //中文ascii化，非常有用！防止中文乱码的神配置  
                    ascii_only: true  
                }  
            },  
            
                files: [  
                    {  
                        expand: true,  
                        //相对路径  
                        cwd: 'src/',  
                        src: ['*.css','!*.min.css'],  
                        dest: 'bulid/css/',                         
                        ext:".min.css"  
                    }  
                ]        
         }  
      },  

        //watch插件的配置信息
        watch: {
            build: {
                files: ['src/*js', 'src/*.css'],
                tasks: ['jshint','csslint','cssmin','uglify'],
                options: { spawn: false }
            }
        }


    });

    //告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）//先进行语法检查，如果没有问题，再压缩
    //grunt.registerTask('default',['jshint', 'csslint', 'cssmin', 'uglify', 'watch']); 
    grunt.registerInitTask('default',['jshint','csslint','cssmin','uglify','watch']);//先进行语法检查，如果没有问题，再合并，再压缩
};