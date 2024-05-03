import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../layout/header/header.component";
import { TitlebannerComponent } from "../layout/titlebanner/titlebanner.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, HeaderComponent,TitlebannerComponent]
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit(){}
  }

