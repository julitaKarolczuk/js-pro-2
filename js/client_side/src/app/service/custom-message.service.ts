import { Injectable } from '@angular/core';
import {MessageService} from "primeng/components/common/messageservice";

@Injectable()
export class CustomMessageService {

  constructor(private messageService: MessageService) { }

  showSuccessMessage(msg: string){
    this.messageService.add({severity:'success', summary: msg, detail:''});
  }

  showErrorMessage(msg: string){
    this.messageService.add({severity:'error', summary: msg, detail:''});
  }
}
