//importando módulos dentro desse módulo.
var gulp = require( 'gulp' ),
    imagemin = require( 'gulp-imagemin' ),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    csslint = require('gulp-csslint'),
    autoPrefixer = require('gulp-autoprefixer'),
    less = require('gulp-less');
var url = '';

gulp.task('default', ['copy'], function(){
    gulp.start('build-img', 'usemin');
});
    
//segundo parametro: dependencia para rodar essa tarefa
gulp.task('copy', ['clean'], function(){
    return gulp.src('src//**/*')
    .pipe( gulp.dest('dist') );
});

gulp.task('clean', function(){
    //retorna um stream(fluxo), para executar as tarefas de forma sincrona(um depois de outro)
    return gulp.src('dist')
    .pipe( clean() );
});

gulp.task( 'build-img', function(){
    //fluxo de leitura
    gulp.src( 'dist/assets/img/**/*' )
    //tubo que liga os fluxos, com módulo opcional como parâmetro 
    .pipe( imagemin() )
    //fluxo de escrita
    .pipe( gulp.dest('dist/assets/img') );
});

// gulp.task('build-js', function(){
//     // gulp.src(['dist/js/jquery.js', 'dist/js/home.js', 'dist/js/produto.js'])
//     gulp.src('dist/assets/vendor/**/*.js')
//     .pipe(concat('all.js'))
//     .pipe(uglify())
//     .pipe( gulp.dest('dist/assets/js') );
// });

// gulp.task('build-html', function(){
//     gulp.src('dist/**/*.html')
//     .pipe( htmlReplace({
//         js: 'assets/js/all.js',
//         css: 'assets/css/all.css'
//     }) )
//     .pipe( gulp.dest('dist') );
// });

gulp.task('usemin', function(){
    gulp.src('dist/**/*.html')
    .pipe(usemin({
        'js': [uglify],
        'css': [autoPrefixer, cssmin]
    }))
    .pipe( gulp.dest('dist/') );
});

// cria o servidor através do localhost na máquina local
gulp.task('server', function(){
    // inicialização
    browserSync.init({
        server: {
            baseDir: 'src'      //endreço raíz quando usar localhost
        }
    });

    gulp.watch('src/assets/js/*.js').on('change', function(event){
        gulp.src(event.path)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
    } );
    gulp.watch('src/assets/css/*.css').on('change', function(event){
        gulp.src(event.path)
        .pipe(csslint())
        .pipe(csslint.reporter());
    });
    gulp.watch('src/assets/less/*.less').on('change', function(event){
        gulp.src(event.path)
        .pipe(less().on('error', function(error) {
            console.log('problema na compilação' + erro.filename);
            console.log(error.message);
        }))
        .pipe(gulp.dest('src/assets/css'));
    });
    gulp.watch('src/**/*').on('change', browserSync.reload );
});