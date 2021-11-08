const mostrar_boton_notas = document.querySelector('#mostrar_notas');
mostrar_boton_notas.addEventListener('click', async function getUser(){

        let id = document.getElementById("input_id").value
        let url
        
        if (id == ""){
                url = `http://localhost:3000/notas`
        } else {
                url = `http://localhost:3000/notas/?id=${id}`
        }
        

        let param = {
                headers:{
                        "content-type": "application/json; charset=UTF-8"
                }, 
                method:"GET"
        }

        try{
                let data = await fetch(url, param)
                let result = await data.json()

                function empty(element) {
                        while(element.firstElementChild) {
                           element.firstElementChild.remove();
                        }
                }
                let parent = document.querySelector("#app");
                empty(parent);

                const HTMLResponse = document.querySelector("#app")

                for (let i = 0; i < result.length; i++){
                        let elem = document.createElement("li")
                        elem.appendChild(
                                document.createTextNode(`mark_id: ${result[i].mark_id} | student_id: ${result[i].student_id} | subject_id: ${result[i].subject_id} | mark: ${result[i].mark}`)
                        )
                        HTMLResponse.appendChild(elem)
                }
                
                
        } catch (err) {
                console.log(err)
        }
});

const crear_boton = document.querySelector('#crear_notas');
crear_boton.addEventListener('click', async function getUser(){

        let student_id = document.getElementById("student_id_crear").value
        let subject_id = document.getElementById("subject_id_crear").value 
        let date = document.getElementById("date_crear").value  
        let mark = document.getElementById("mark_crear").value

        let nota = {"student_id": student_id, "subject_id": subject_id, "date": date, "mark": mark}
        let url = `http://localhost:3000/notas`

        let param = {
                headers:{"content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(nota),
                method:"POST"
        }

        try{
                let data = await fetch(url, param)
                let result = await data.json()
        } catch (err) {
                console.log(err)
        }
})

const actualizar_boton = document.querySelector('#actualizar_notas');
actualizar_boton.addEventListener('click', async function getUser(){
        
        let student_id = document.getElementById("student_id_actualizar").value
        let subject_id = document.getElementById("subject_id_actualizar").value 
        let date = document.getElementById("date_actualizar").value  
        let mark = document.getElementById("mark_actualizar").value
        let mark_id = document.getElementById("mark_id_actualizar").value

        let nota = {"student_id": student_id, "subject_id": subject_id, "date": date, "mark": mark, "mark_id":mark_id}
        let url = `http://localhost:3000/notas`

        for (let i in nota){
                if (nota[i] == ""){
                        nota[i] = null
                }
        }

        let param = {
                headers:{"content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(nota),
                method:"PUT"
        }

        try{
                let data = await fetch(url, param)
                let result = await data.json()
        } catch (err) {
                console.log(err)
        }
});

const eliminar_boton = document.querySelector('#eliminar');
eliminar_boton.addEventListener('click', async function getUser(){
        let mark_id = document.getElementById("mark_id_eliminar").value
        let nota = {"mark_id": mark_id}
        let url = `http://localhost:3000/notas`

        let param = {
                headers:{"content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(nota),
                method:"DELETE"
        }

        try{
                let data = await fetch(url, param)
                let result = await data.json()
        } catch (err) {
                console.log(err)
        }
});