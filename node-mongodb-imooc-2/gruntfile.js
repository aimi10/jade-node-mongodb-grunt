module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            tasks: ['watch', 'nodemon','uglify'],
            options: {
                limit: 5,
                logConcurrentOutput: true//这个必须加
            }
        },
        watch: {
            jade: {
                files: ["views/pages/**","views/layout.jade"],
                options: {
                    livereload: true
                }
            },
            sass: {
                // We watch and compile sass files as normal but don't live reload here 
                files: ['public/css/all.scss'],//监测all.scss变化,如果有改动,马上重启服务
                tasks: ['sass']
            },
            livereload: {
                // Here we watch the files the sass task will compile to 
                // These files are sent to the live reload server after sass compiles to them 
                options: {livereload: true},
                files: ['public/css/all.css']
            }
        },
        sass: {
            dev: {
                src: ['public/css/all.scss'],//结合watch,实时编译
                dest: 'public/css/all.css'
            }
        },
        uglify: {
            my_target: {
                files: {
                    //用这个压缩代码,也实现了代码连接,没有用到grunt-contrib-concat
                    'public/js/all.min.js': ['public/lib/jquery/dist/jquery.min.js', 'public/lib/amazeui/dist/js/amazeui.min.js','public/js/all.js']
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    env: {
                        PORT: '3000'
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");//实时监测文件
    grunt.loadNpmTasks("grunt-concurrent");//多任务执行
    grunt.loadNpmTasks("grunt-contrib-nodemon");//自动重启server
    grunt.loadNpmTasks("grunt-contrib-sass");//编译sass
    grunt.loadNpmTasks("grunt-contrib-uglify");//编译sass
    //默认被执行的任务列表
    grunt.registerTask('default', ['concurrent']);
}

