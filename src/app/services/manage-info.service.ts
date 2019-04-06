import { Injectable } from '@angular/core';

@Injectable()
export class ManageInfoService {
    chain_name: string;
    hotel_id: string;

  constructor() { 
      this.chain_name = "";
      this.hotel_id = "";
   }

}