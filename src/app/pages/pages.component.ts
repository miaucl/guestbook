import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dropbox } from 'dropbox';
import { LocalStorageService } from '../services';

function _blobToBase64(blob: Blob)
{
  return new Promise((resolve, _) =>
  {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit
{
  i = 0
  data?: SafeUrl;

  constructor(
    public localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void
  {
    this.lastPage()
  }

  async loadPage()
  {
    this.data = undefined;
    const dbx = new Dropbox({ accessToken: this.localStorageService.data.token });
    const res = await dbx.filesDownload({ path: this.localStorageService.data.entries[this.i] })
    this.data = this.sanitizer.bypassSecurityTrustUrl(await _blobToBase64((res.result as any).fileBlob) as string)
  }

  firstPage()
  {
    this.i = 0;
    this.loadPage()
  }

  nextPage()
  {
    this.i++;
    this.loadPage()
  }

  previousPage()
  {
    this.i--;
    this.loadPage()
  }

  lastPage()
  {
    this.i = this.localStorageService.data.entries.length - 1;
    this.loadPage()
  }

}
