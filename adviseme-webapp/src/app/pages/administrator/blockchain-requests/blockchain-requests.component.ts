import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../../_shared/services/blockchain.service';
import { Blockchain } from '../../../_shared/models/blockchain';

@Component({
  selector: 'ngx-blockchain-requests',
  templateUrl: './blockchain-requests.component.html',
  styleUrls: ['./blockchain-requests.component.scss'],
})
export class BlockchainRequestsComponent implements OnInit {
  constructor(private blockchainService: BlockchainService ) {
  }

  blockchain: Blockchain;

  ngOnInit() {
    console.log(this.blockchainService.getChain());
  }
}
