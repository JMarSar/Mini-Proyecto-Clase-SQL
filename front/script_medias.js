const obtener_medias = document.querySelector('#mostrar_medias');
obtener_medias.addEventListener('click', async function getUser(){

        let student_id = document.getElementById("media_id").value

        let url = `http://localhost:3000/medias/?student_id=${student_id}`

        let param = {
                headers:{"content-type": "application/json; charset=UTF-8"},
                method:"Get"
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
                
                if (result[0].avg_mark == null) {
                        const HTMLResponse = document.querySelector("#app")

                        for (let i = 0; i < result.length; i++){
                                let elem = document.createElement("li")
                                elem.appendChild(
                                        document.createTextNode(`El alumno ${student_id} no tiene suficientes notas para hacer la media :(`)
                                )
                                HTMLResponse.appendChild(elem)
                        }
                } else {
                        const HTMLResponse = document.querySelector("#app")

                        for (let i = 0; i < result.length; i++){
                                let elem = document.createElement("li")
                                elem.appendChild(
                                        document.createTextNode(`El alumno ${student_id} tiene de media: ${result[0].avg_mark}`)
                                )
                                HTMLResponse.appendChild(elem)
                        }
                }
                
        } catch (err) {
                console.log(err)
        }
})

const mostrar_boton_apuntadas = document.querySelector('#mostrar_apuntadas');
mostrar_boton_apuntadas.addEventListener('click', async function getUser(){

        let student_id = document.getElementById("apuntadas_id").value
        let url
        
        if (student_id == ""){
                url = `http://localhost:3000/apuntadas`
        } else {
                url = `http://localhost:3000/apuntadas/?student_id=${student_id}`
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
                                document.createTextNode(`${result[i].first_name} ${result[i].last_name} está apuntado a la asignatura: ${result[i].title}`)
                        )
                        HTMLResponse.appendChild(elem)
                }
                
                
        } catch (err) {
                console.log(err)
        }
});

const mostrar_boton_impartidas = document.querySelector('#mostrar_impartidas');
mostrar_boton_impartidas.addEventListener('click', async function getUser(){

        let teacher_id = document.getElementById("impartidas_id").value
        let url
        
        if (teacher_id == ""){
                url = `http://localhost:3000/impartidas`
        } else {
                url = `http://localhost:3000/impartidas/?teacher_id=${teacher_id}`
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
                                document.createTextNode(`${result[i].first_name} ${result[i].last_name} imparte la asignatura: ${result[i].title}`)
                        )
                        HTMLResponse.appendChild(elem)
                }
                
                
        } catch (err) {
                console.log(err)
        }
});