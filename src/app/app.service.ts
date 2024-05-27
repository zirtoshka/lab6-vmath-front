import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly baseUrl = `http://localhost:8080/app-controller`;
  dataUser = ['Zero zero one one one zero zero one one\nCryin\' zeros and I\'m\nZero zero one one one zero zero one one\nCryin\' zeros and I\'m'];
  numberX = 0;
}
