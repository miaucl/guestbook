import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebcamImage } from 'ngx-webcam';
import { merge, Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AdminComponent } from './admin/admin.component';
import { LocalStorageService } from './services';
import { NgWhiteboardService, FormatType } from 'ng-whiteboard';
import { Dropbox } from 'dropbox';
import { PagesComponent } from './pages/pages.component';

function _base64ToArrayBuffer(base64: string)
{
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) bytes[i] = binary_string.charCodeAt(i);
  return bytes.buffer;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  FormatType = FormatType

  smile: Subject<number> = new Subject<number>();
  smileDelayed: Subject<number> = new Subject<number>();
  trigger: Observable<any> = merge(this.smile, this.smileDelayed.pipe(delay(3000)))

  color = "#000000"
  size = 5

  constructor(
    public localStorageService: LocalStorageService,
    private modalService: NgbModal,
    public whiteboardService: NgWhiteboardService
  )
  {

  }

  openAdmin()
  {
    if (prompt("Enter the admin PIN", "") === this.localStorageService.data.pin) this.modalService.open(AdminComponent);
  }

  openPages()
  {
    this.modalService.open(PagesComponent, { size: 'lg' });
  }


  openWebcam(content: TemplateRef<HTMLElement>)
  {
    this.modalService.open(content);
  }


  handleImage(webcamImage: WebcamImage): void
  {
    console.info('received webcam image', webcamImage);
    this.whiteboardService.addImage(webcamImage.imageAsDataUrl)
    this.modalService.dismissAll()

  }

  async onSave(img_: string | Blob)
  {
    const img = img_ as string;

    const dbx = new Dropbox({ accessToken: this.localStorageService.data.token });

    try
    {
      const path = `/${ this.localStorageService.data.name }/page-${ this.localStorageService.data.entries.length }.png`
      await dbx.filesUpload({ path: path, contents: _base64ToArrayBuffer(img.split(',')[1]) })
      this.localStorageService.data.entries.push(path)
      this.localStorageService.save()
      this.whiteboardService.erase()
      alert("Page saved successfully!")
    }
    catch (e)
    {
      console.error(e)
      alert("Could not upload!")
    }
  }
}
