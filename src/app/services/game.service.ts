import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Image } from '../model/image.model';
import { Studio } from '../model/studio.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudioWrapper } from '../model/studioWrapped.model';
import { AuthService } from './auth.service'; // Import AuthService

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  apiUrl = 'http://localhost:8081/games/api';
  apiURLStudio = 'http://localhost:8081/games/api/studio';
  studios!: Studio[];

  constructor(private http: HttpClient, private authService: AuthService) {} // Inject AuthService

  private getAuthHeaders(): HttpHeaders {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    return new HttpHeaders({ Authorization: jwt });
  }

  listeGame(): Observable<Game[]> {
    const url = `${this.apiUrl}/all`;
    // testing interceptor 👇👇👇👇👇👇
    return this.http.get<Game[]>(url);
  }

  ajouterGame(pls: Game): Observable<Game> {
    const url = `${this.apiUrl}/addgame`;
    return this.http.post<Game>(url, pls, { headers: this.getAuthHeaders() });
  }

  supprimerGame(id: number): Observable<void> {
    const url = `${this.apiUrl}/delgame/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }

  consulterGame(id: number): Observable<Game> {
    const url = `${this.apiUrl}/getbyid/${id}`;
    return this.http.get<Game>(url, { headers: this.getAuthHeaders() });
  }

  updateGame(p: Game): Observable<Game> {
    const url = `${this.apiUrl}/updategame`;
    return this.http.put<Game>(url, p, { headers: this.getAuthHeaders() });
  }

  listeStudios(): Observable<StudioWrapper> {
    return this.http.get<StudioWrapper>(this.apiURLStudio, {
      headers: this.getAuthHeaders(),
    });
  }

  consulterStudio(id: number): Studio {
    return this.studios.find((ty) => ty.idStudio == id)!;
  }

  rechercherParStudio(idStudio: number): Observable<Game[]> {
    const url = `${this.apiUrl}/gamesbystudio/${idStudio}`;
    return this.http.get<Game[]>(url, { headers: this.getAuthHeaders() });
  }
  rechercherParNom(nom: string): Observable<Game[]> {
    const url = `${this.apiUrl}/gamesbyname/${nom}`;
    return this.http.get<Game[]>(url, { headers: this.getAuthHeaders() });
  }

  ajouterStudio(studio: Studio): Observable<Studio> {
    return this.http.post<Studio>(this.apiURLStudio, studio, {
      headers: this.getAuthHeaders(),
    });
  }

  // images ---------

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiUrl + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiUrl + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  // images methode 2

  uploadImageProd(
    file: File,
    filename: string,
    idProd: number
  ): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiUrl + '/image/uplaodImageProd'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }
  supprimerImage(id: number) {
    const url = `${this.apiUrl}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
