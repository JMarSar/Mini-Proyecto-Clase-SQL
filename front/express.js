const mysql = require('mysql2');
const express = require('express');
const cors = require('cors')
const app = express()
const port = 3000

// create the connection to database
let connection = mysql.createConnection(
        {
                host: "localhost",
                user: "root",
                password: "jorge123",
                database: "prueba1"
        }
)
connection.connect((error) => {
        if (error){
                console.log(error)
        } else {
                console.log("Conexion a la base de datos correcta")
        }
})

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let respuesta
let sql
let alumno = null
let alumnos = new Array
let myIDs = new Array



app.get("/", (request, response) => {
                respuesta = {error: true, codigo: 200, mensaje: "Punto de inicio"}
                response.send(respuesta)
        }
)

app.get("/alumnos", (request, response) => {
        let id = request.query.id
        if(id == null || id == undefined){
                sql = `SELECT * FROM students`
                connection.query( sql, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                respuesta = {error: false, codigo: 200, mensaje: 'La lista existe', resultado: result}
                                response.send(result)   
                        }
                })
        } else {
                sql = `SELECT * FROM students WHERE student_id=${id} ORDER BY student_id, group_id ASC`
                connection.query( sql, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                respuesta = {error: false, codigo: 200, mensaje: 'El usuario existe', resultado: result}
                                response.send(result)   
                        }
                })
        }
}
)

app.get("/notas", (request, response) => {
        let id = request.query.id
        if(id == null || id == undefined){
                sql = `SELECT * FROM marks ORDER BY student_id, subject_id ASC`
                connection.query( sql, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                respuesta = {error: false, codigo: 200, mensaje: 'La lista existe', resultado: result}
                                response.send(result)   
                        }
                })
        } else {
                sql = `SELECT * FROM marks WHERE mark_id=${id}`
                connection.query( sql, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                respuesta = {error: false, codigo: 200, mensaje: 'El usuario existe', resultado: result}
                                response.send(result)   
                        }
                })
        }
}
)

app.get("/medias", (request, response) => {
        let student_id = request.query.student_id
        
        let sql = `SELECT AVG (mark) AS avg_mark FROM marks WHERE student_id = ${student_id}`
        
        connection.query(sql, function(err,result){

                if(err){
                        console.log(err)
                }
                else{
                        let respuesta = {error: false, codigo: 200, resultado: result}
                        response.send(result)
                }
        })
        
})

app.get("/apuntadas", (request, response) => {
        let student_id = request.query.student_id
        if(student_id == null || student_id == undefined){
                sql = `SELECT first_name, last_name, title FROM marks AS m INNER JOIN students ON (m.student_id = students.student_id) INNER JOIN subjects ON(m.subject_id = subjects.subject_id)`
                connection.query( sql, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                respuesta = {error: false, codigo: 200, mensaje: 'La lista existe', resultado: result}
                                response.send(result)   
                        }
                })
        } else {
                let sql = `SELECT first_name, last_name,title FROM marks AS m INNER JOIN students ON (m.student_id = students.student_id) INNER JOIN subjects ON(m.subject_id = subjects.subject_id)  WHERE m.student_id = ${student_id}`
                connection.query( sql, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                respuesta = {error: false, codigo: 200, mensaje: 'El usuario existe', resultado: result}
                                response.send(result)   
                        }
                })
        }
}
)

app.get("/impartidas", (request, response) => {
        let teacher_id = request.query.teacher_id
        if(teacher_id == null || teacher_id == undefined){
                sql = `SELECT first_name, last_name, title FROM subjects_teacher AS st INNER JOIN teachers ON (st.teacher_id = teachers.teacher_id) INNER JOIN subjects ON(st.subject_id = subjects.subject_id)`
                connection.query( sql, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                respuesta = {error: false, codigo: 200, mensaje: 'La lista existe', resultado: result}
                                response.send(result)   
                        }
                })
        } else {
                sql = `SELECT first_name, last_name, title FROM subjects_teacher AS st INNER JOIN teachers ON (st.teacher_id = teachers.teacher_id) INNER JOIN subjects ON(st.subject_id = subjects.subject_id)  WHERE st.teacher_id = ${teacher_id}`
                connection.query( sql, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                respuesta = {error: false, codigo: 200, mensaje: 'El usuario existe', resultado: result}
                                response.send(result)   
                        }
                })
        }
}
)

app.post("/alumnos", (request, response) => {    
                let first_name = request.body.first_name
                let last_name = request.body.last_name
                let group_id = request.body.group_id
                let ingreso = request.body.ingreso

                let params = [first_name, last_name, group_id, ingreso]

                sql = `INSERT INTO students (first_name, last_name, group_id, ingreso) VALUES (?, ?, ?, ?)`
                connection.query( sql, params, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                if (result.insertId){
                                        response.send(String(result.insertId))
                                } else {
                                        response.send("-1")
                                }
                        }
                })
        }
)

app.post("/notas", (request, response) => {    
        let student_id = request.body.student_id
        let subject_id = request.body.subject_id
        let date = request.body.date
        let mark = request.body.mark

        let params = [student_id, subject_id, date, mark]

        sql = `INSERT INTO marks (student_id, subject_id, date, mark) VALUES (?, ?, ?, ?)`
        connection.query( sql, params, (err, result) => {
                if (err){
                        console.log(err)
                } else {
                        if (result.insertId){
                                response.send(String(result.insertId))
                        } else {
                                response.send("-1")
                        }
                }
        })
}
)

app.put("/alumnos", (request, response) =>{
        let first_name = request.body.first_name
        let last_name = request.body.last_name
        let group_id = request.body.group_id
        let ingreso = request.body.ingreso
        let id = request.body.id
        
        let params = [first_name, last_name, group_id, ingreso, id]

        console.log(request.body)
        sql = 'UPDATE students SET first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name), group_id = COALESCE(?, group_id), ingreso = COALESCE(?, ingreso) WHERE student_id = ?'
        connection.query( sql, params, (err, result) => {
                if (err){
                        console.log(err)
                } else {
                        if (result.affectedRows){
                                response.send(String(result.affectedRows))
                        } else {
                                response.send("-1")
                        }
                }
        })
} 
)

app.put("/notas", (request, response) =>{
        let student_id = request.body.student_id
        let subject_id = request.body.subject_id
        let date = request.body.date
        let mark = request.body.mark
        let mark_id = request.body.mark_id

        let params = [student_id, subject_id, date, mark, mark_id]

        sql = 'UPDATE marks SET student_id = COALESCE(?, student_id), subject_id = COALESCE(?, subject_id), date = COALESCE(?, date), mark = COALESCE(?, mark) WHERE mark_id = ?'
        connection.query( sql, params, (err, result) => {
                if (err){
                        console.log(err)
                } else {
                        if (result.affectedRows){
                                response.send(String(result.affectedRows))
                        } else {
                                response.send("-1")
                        }
                }
        })
} 
)

app.delete("/alumnos", (request, response) => {
                let id = request.body.id
                
                sql = `DELETE FROM students WHERE student_id=${id}`
                connection.query( sql, (err, result) => {
                        if (err){
                                console.log(err)
                        } else {
                                if (result.affectedRows){
                                        response.send(String(result.affectedRows))
                                } else {
                                        response.send("-1")
                                }
                        }
                })
        }
)

app.delete("/notas", (request, response) => {
        let mark_id = request.body.mark_id
        
        sql = `DELETE FROM marks WHERE mark_id = ${mark_id}`
        connection.query( sql, (err, result) => {
                if (err){
                        console.log(err)
                } else {
                        if (result.affectedRows){
                                response.send(String(result.affectedRows))
                        } else {
                                response.send("-1")
                        }
                }
        })
}
)

app.use( (req,res,next) => 
        {
            respuesta = {error: true, codigo: 404, mensaje: 'URL no encontrada'};
            res.status(404).send(respuesta);
        }
)

app.listen(port, "localhost", () =>  {
        console.log(`Puerto ${port} encendido!`)
})