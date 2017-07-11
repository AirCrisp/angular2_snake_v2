import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import 'hammerjs';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game.component';
import { GameService } from './game.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdButtonModule, 
    MdCheckboxModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
