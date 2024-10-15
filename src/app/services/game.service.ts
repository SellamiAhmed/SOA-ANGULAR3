import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Studio } from '../model/studio.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudioWrapper } from '../model/studioWrapped.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
}
@Injectable({
providedIn: 'root'
})
export class GameService {
   apiUrl = 'http://localhost:8081/games/api';
   apiURLStudio = 'http://localhost:8081/games/api/studio';
   studios!: Studio[];
   constructor(private http: HttpClient) { }

listeGame(): Observable <Game[]> {
  console.log("1");
  return this.http.get<Game[]>(this.apiUrl);
}
ajouterGame( pls: Game) : Observable<Game>{
  return this.http.post<Game>(this.apiUrl, pls, httpOptions);
}
supprimerGame( id: number){
  const url = `${this.apiUrl}/${id}`;
  return this.http.delete(url, httpOptions);
  
  //ou Bien
  /* this.games.forEach((cur, index) => {
  if(pls.idGame === cur.idGame) {
  this.games.splice(index, 1);
  }
  }); */
  }
consulterGame(id:number): Observable <Game>{
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Game>(url);
  }
    
    // trierGames(){
    //   this.games = this.games.sort((n1,n2) => {
    //   if (n1.idGame! > n2.idGame!) {
    //   return 1;
    //   }
    //   if (n1.idGame! < n2.idGame!) {
    //   return -1;
    //   }
    //   return 0;
    //   });
    //   }
updateGame(p:Game): Observable<Game>{
  return this.http.put<Game>(this.apiUrl, p, httpOptions);
}
listeStudios(): Observable <StudioWrapper> {
  return this.http.get<StudioWrapper>(this.apiURLStudio);}
consulterStudio(id:number): Studio{
    return this.studios.find(ty => ty.idStudio == id)!;
    }  

    rechercherParStudio(idStudio: number):Observable< Game[]> {
      const url = `${this.apiUrl}/plsstudio/${idStudio}`;
      return this.http.get<Game[]>(url);
      }

      rechercherParNom(nom: string):Observable< Game[]> {
        const url = `${this.apiUrl}/plsByName/${nom}`;
        return this.http.get<Game[]>(url);
        }
        
        ajouterStudio( studio: Studio):Observable<Studio>{
          return this.http.post<Studio>(this.apiURLStudio, studio, httpOptions);
          }
          
      
}
