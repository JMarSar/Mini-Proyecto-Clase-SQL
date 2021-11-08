const mostrar_boton = document.querySelector('#mostrar');
mostrar_boton.addEventListener('click', async function getUser(){
        console.log("HOLA")
        let id = document.getElementById("input_id").value
        let url
        
        if (id == ""){
                url = `http://localhost:3000/alumnos`
        } else {
                url = `http://localhost:3000/alumnos/?id=${id}`
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
                                document.createTextNode(`id: ${result[i].student_id} | nombre: ${result[i].first_name} ${result[i].last_name} | grupo: ${result[i].group_id} | fecha de ingreso: ${result[i].ingreso}`)
                        )
                        HTMLResponse.appendChild(elem)
                }
                
                
        } catch (err) {
                console.log(err)
        }
});


const crear_boton = document.querySelector('#crear');
crear_boton.addEventListener('click', async function getUser(){

        let first_name = document.getElementById("first_name").value
        let last_name = document.getElementById("last_name").value 
        let group_id = document.getElementById("group_id").value  
        let ingreso = document.getElementById("ingreso").value

        let alumno = {"first_name": first_name, "last_name": last_name, "group_id": group_id, "ingreso": ingreso}
        let url = `http://localhost:3000/alumnos`

        let param = {
                headers:{"content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(alumno),
                method:"POST"
        }

        try{
                let data = await fetch(url, param)
                let result = await data.json()
        } catch (err) {
                console.log(err)
        }
});

const actualizar_boton = document.querySelector('#actualizar');
actualizar_boton.addEventListener('click', async function getUser(){

        let id = document.getElementById("input_id_actualizar").value
        let first_name = document.getElementById("first_name_actualizar").value
        let last_name = document.getElementById("last_name_actualizar").value 
        let group_id = document.getElementById("group_id_actualizar").value  
        let ingreso = document.getElementById("ingreso_actualizar").value

        let alumno = { first_name: first_name, "last_name": last_name, "group_id": group_id, "ingreso": ingreso, "id": id}
        
        for( let i in alumno) {
                if (alumno[i] == "")
                        alumno[i] = null
        }
        
        let url = `http://localhost:3000/alumnos`

        let param = {
                headers:{"content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(alumno),
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

        let id = document.getElementById("student_id_eliminar").value
        let url = `http://localhost:3000/alumnos`
        let usuario = {"id": id}

        let param = {
                headers:{"content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(usuario),
                method:"DELETE"
        }

        try{
                let data = await fetch(url, param)
                let result = await data.json()

        } catch (err) {
                console.log(err)
        }
});