$(document).ready(function(){
    $("#username").on("keyup", function(event){
        let userName = event.target.value;
        //Request Api
        $.ajax({
            url: 'https://api.github.com/users/' + userName,
            data: {
                client_id: '9f169ef5ef32a061a9e8',
                client_secret: '632ea9b56b1ac9928c63b56a0cba91d0b70de11a'
            }
        //User Api
        }).done(function(user){
            $.ajax({
                url: 'https://api.github.com/users/' + userName + '/repos',
                data: {
                    client_id: '9f169ef5ef32a061a9e8',
                    client_secret: '632ea9b56b1ac9928c63b56a0cba91d0b70de11a'
                },
                sort: 'created: asc',
                per_page: 5
        //Repos Api
            }).done(function(repos){
                $.each(repos, function(index,repo){
                    console.log(repo);
                     $('#repos').append(
                         `
                         <div class="col mb-3">
                         <div class="card shadow-sm bg-body rounded border-0">
                             <div class="card-body">
                                 <h3 class="card-title text-uppercase">${repo.name}</h3>
                                 <p class="card-text">${repo.description}</p>
                                 <div class="d-flex ">
                                 <span class="badge rounded-pill bg-primary me-2">Forks:${repo.forks_count}</span>
                                 <span class="badge rounded-pill bg-secondary me-2">Watchers:${repo.watchers_count}</span>
                                  <span class="badge rounded-pill bg-warning me-2">Stars:${repo.stargazers_count}</span>
                                 </div>
                                 <a target="_blank" href="${repo.html_url}" class="btn btn-success mt-3">View
                                     Repo</a>
                             </div>
                         </div>
                     </div>
                         `
                     )
                })
            }).fail(function (jqXHR, exception) {
                //var msg = '';
                if (jqXHR.status == 404) {
                   // msg = 'Requested page not found. [404]';
                   console.log("Error");
                }
                else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                }
                else{
                    alert("404")
                }
            })
            $("#user").html(
                 //Template Literals
                 ` 
                   <img
                     src="${user.avatar_url}"
                     alt="..."
                     class="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0"
                   />
                   <h4 class="mt-2">
                      ${user.name}
                   </h4>
                   <p>${user.bio}</p>
                   <div class="d-flex flex-column">
                       <a target="_blank" href="${user.html_url}" class="btn btn-success">View
                           Profile</a>
                   </div>
                   <div class="d-flex mt-2">
                       <p class="me-3">Followers : ${user.followers}</p>
                       <p class="me-3">|</p>
                       <p>Following : ${user.following}</p>
                   </div>
                   <hr>
                   <div class="d-flex">
                       <p class="me-3">${user.email}</p>
                       <p class="me-3">|</p>
                       <p>${user.twitter_username}</p>
                   </div>
                   <hr>
                   <div class="d-flex flex-column">
                       <ul class="list-group">
                           <li class="list-group-item"> Public Repos: <span class="badge rounded-pill bg-primary mx-2">${user.public_repos}</span></li>
                           <li class="list-group-item"> Public Gists:<span class="badge rounded-pill bg-secondary mx-2">${user.public_gists}</span></li>
                           <li class="list-group-item"> Collaborators:<span class="badge rounded-pill bg-dark mx-2">${user.collaborators}</span></li>
                         </ul>
                   </div>
                  
                 `
            ) 
        })
    })
});