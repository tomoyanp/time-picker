import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if ("Notification" in window) {
      var notification = new Notification("Hello, world!");
    } else {
      const width = window.screen.width - 300;
      const height = window.screen.height - 200;
      setTimeout(() => {
        const subWindow = window.open("", "", `top=${height},left=${width},width=200,height=100,location=no,menubar=no,toolbar=no,resizable=no,scrollbars=no,status=no`);
        subWindow.focus();
        const div = subWindow.document.createElement("div");
        div.innerHTML = "hogehoge";
        subWindow.document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
        subWindow.document.body.appendChild(div);
        setTimeout(() => {
          subWindow.close();
        }, 3000)
      }, 0)
    }
  }

}
