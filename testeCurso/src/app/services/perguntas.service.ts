import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MatSnackBar } from '@angular/material';

import { Pergunta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {

  readonly PERGUNTAS_COLLECTION: string = 'perguntas';
  readonly SNACK_BARDURATION: any = { duration: 5000 };
  private perguntasCollection: AngularFirestoreCollection<Pergunta>;

  constructor(
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
    ) { 
    this.perguntasCollection = this.afs.collection<Pergunta>(this.PERGUNTAS_COLLECTION);
  }

  obterPerguntas(): Observable<Pergunta[]> {
    return this.perguntasCollection
      .snapshotChanges()
      .map(this.mapearIds);
  }

  mapearIds(perguntas: DocumentChangeAction<Pergunta>[]): Pergunta[] {
    return perguntas.map(objPergunta => {
      const pergunta = objPergunta.payload.doc.data() as Pergunta;
      pergunta.id = objPergunta.payload.doc.id;
      return pergunta;
    });
  }

  cadastrar(pergunta: Pergunta) {
    this.perguntasCollection.add(pergunta)
      .then(res => this.snackBar.open(
        'Add essa merda no banco!',
        'Ok', this.SNACK_BARDURATION
      ))
      .catch(err => this.snackBar.open(
        'Essa merda deu problema!',
        'Erro', this.SNACK_BARDURATION
      ));
  }

}
