import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Req} from "./request";
import {Respon} from "./response";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly baseUrl = `http://localhost:8080/app-controller`;
  dataUser = ['Zero zero one one one zero zero one one\nCryin\' zeros and I\'m\nZero zero one one one zero zero one one\nCryin\' zeros and I\'m'];
  numberX = 0;

  constructor(private httpClient: HttpClient,private messageService: MessageService) {
  }


  odeRequest(req: Req) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<Respon>(`${this.baseUrl}`, JSON.stringify(req), {headers});
  }

  show(severity:string, summary:string, detail:string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
}
