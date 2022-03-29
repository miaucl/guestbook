import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from '../services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit
{

  constructor(
    public localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    ) { }

  ngOnInit(): void
  {
  }

  download()
  {
    console.log("DOWNLOAD")
  }

}
