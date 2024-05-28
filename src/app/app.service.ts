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
  dataUser :any;
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
  getStringRes(respon: Respon): { runge: number; x: number; exact: number; euler:number, milne: number}[] {
    let x = respon.xList;
    let exact= respon.exact;
    let euler=respon.euler;
    let runge=respon.runge;
    let milne = respon.milne;


    return  x.map((x, index) => ({
      x: x,
      exact: exact[index],
      runge: runge[index],
      euler: euler[index],
      milne: milne[index]
    }));



  }
}
