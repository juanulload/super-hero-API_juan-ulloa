
$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault()
        let id_input = $('#input').val()

        if (validate(id_input) == true) {

            var dataPoints = [];

            var options = {
                animationEnabled: true,
                title: {
                    text: "Estadísticas de Poder"
                },
                data: [{
                    type: 'doughnut',
                    startAngle: 240,
                    innerRadius: "40%",
                    yValueFormatString: "##0\"\"",
                    indexLabel: "{label}: {y}",
                    showInLegend: "true",
                    legendText: "{label}",
                    dataPoints: dataPoints
                }]
            }

            $.ajax({
                type: "GET",
                url: "https://superheroapi.com/api.php/10159204059438886/" + id_input,
                dataType: "json",
                success: function (data) {
                    console.log(data)
                    let name_hero = data.name
                    let connection = data.connections['group-affiliation']
                    let occupation = data.work.occupation
                    let height = data.appearance.height
                    let weight = data.appearance.weight
                    let alias = data.biography.aliases
                    let birth = data['place-of-birth']
                    let f_name = data.biography['full-name']
                    let eyes = data.appearance['eye-color']
                    let hair = data.appearance['hair-color']
                    let img = data.image.url

                    
                    let powerstats = data.powerstats
                    
                    for (const property in powerstats) {
                        
                        if (powerstats[property] !== null) {
                            dataPoints.push({
                                y: powerstats [property], label: property
                            })
                        }
                        
                    }

                    
                    $("#chartContainer").CanvasJSChart(options);
                    $('#title-hero').html(`<h3>SuperHero encontrado</h3>`)
                    $('#card-hero').html(` 
                        
                        <div class="card mb-3" style="max-width: 700px;">
                            
                            <div class="row g-0">
                                
                                <div class="col-md-5">
                                    <img src="${img}" class="img-fluid rounded-start my-auto">
                                </div>
                        
                                <div class="col-md-7">
                            
                                    <div class="card-body pb-0">
                                        <h3 class="card-title">${name_hero}</h3>
                                    </div>                
                                    
                                    <ul class="list-group list-group-flush pb-2">
                                        <li class="list-group-item pt-0">Nombre Completo: ${f_name}<br>Alias: ${alias}</li>
                                        <li class="list-group-item">Ocupación: ${occupation}</li>
                                        <li class="list-group-item">Lugar de Nacimiento: ${birth}</li>
                                        <li class="list-group-item">Afiliaciones: ${connection}</li>
                                        <li class="list-group-item">Estatura: ${height}<br>Peso: ${weight}</li>
                                        <li class="list-group-item">Color de Ojos: ${eyes}<br>Color de Cabello: ${hair}</li>                                        
                                    </ul>
                                </div>  
                        
                            </div>
                        </div>
                    `)

                    
                    


                },

                error: function (error) {
                    alert("Error")
                }
            })


        }



    })
})


function validate(id_input) {
    var flag = true
    var pattern = /^[0-9]/gim

    if (!id_input.match(pattern)) {
        alert("Ingresa un ID numérico")
        flag = false
    }

    return flag
}


