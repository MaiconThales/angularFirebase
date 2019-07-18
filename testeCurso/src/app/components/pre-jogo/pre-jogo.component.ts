import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-pre-jogo',
  templateUrl: './pre-jogo.component.html',
  styleUrls: ['./pre-jogo.component.css']
})
export class PreJogoComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
    ) { }

  ngOnInit() {
  }

  sair() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

}
