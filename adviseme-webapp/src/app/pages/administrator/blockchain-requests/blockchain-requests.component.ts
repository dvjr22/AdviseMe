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

  blockchain = [];

  ngOnInit() {
    this.blockchainService.getChain().subscribe((res) => {
      res.data.forEach(function(block) {
        this.blockchain.push(block);
        console.log(this.blockchain);
      }, this);
      // console.log(this.blockchain);
      // this.blockchain._id = res.data._id;
      // this.blockchain.previousHash = res.data.previousHash;
      // this.blockchain.data = res.data.data;
      // this.blockchain.timestamp = res.data.timestamp;
      // this.blockchain.nonce = res.data.nonce;
      // console.log('Blockchain' + this.blockchain._id);
    });
  }
}
