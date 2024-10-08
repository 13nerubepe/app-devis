import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Client, Devis, Product, ValeursRequest } from "../classes/table-data";
import { BehaviorSubject, catchError, forkJoin, map, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProformasService{
  private baseUrlDevis = 'http://localhost:3000';
  private baseUrlClient = 'http://localhost:3001';
  private baseUrlProduct = 'http://localhost:3002';

  formValues: BehaviorSubject<Devis | null> = new BehaviorSubject<Devis | null>(null);
  private clientSource = new BehaviorSubject<Client | null>(null);//Permet de stocker et de diffuser la dernière valeur observée aux nouveaux abonnés.
  private produitSource = new BehaviorSubject<Product[]>([]);
  private quantiteSource = new BehaviorSubject<Devis[]>([]);
  Quantite$ =this.quantiteSource.asObservable();
  Products$ = this.produitSource.asObservable();
  client$ = this.clientSource.asObservable();
  constructor(private _http: HttpClient,) {

  }
  devis: Product[]=[];
  clients: Client[]=[];
  serveDevisS(devis: Product[]){
    this.devis = devis;
  }

  // mettre a jour le client selectionné
  setClient(client: Client) {
    this.clientSource.next(client); // Met à jour le client actuel
  }
  // recuper les donner saisi par lutilisateur
  getFormValue() {
    return this.formValues.getValue()
  }

  setQuantite(updatedDevis: Devis) {
    let currentDevis = this.quantiteSource.getValue();
    const index = currentDevis.findIndex(d => d.devisId === updatedDevis.devisId);
    if (index !== -1) {
      currentDevis[index] = updatedDevis;
      this.quantiteSource.next(currentDevis);
    }
  }
  updatequantite(productId:number, top:Product): Observable<Product>{
    return this._http.put<Product>(`${this.baseUrlDevis}/devis/${productId}`, top).pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse): Observable<never> {

    return throwError('Something bad happened; please try again later.');
  }

  setProduct(varProduct: Product|Product[]) {
    // Récupère la liste actuelle des produits sélectionnés
    const currentProducts =this.produitSource.value;
    // Assure que varProduct est un tableau
    const productsToAdd = Array.isArray(varProduct) ? varProduct : [varProduct];
    // Crée un Set pour les IDs de produits existants afin d'éviter les doublons
    const existingProductIds = new Set(currentProducts.map(p => p.productId));

    // Ajoute uniquement les produits qui ne sont pas déjà dans la liste
    productsToAdd.forEach(product => {
      if (!existingProductIds.has(product.productId)) {
        currentProducts.push(product);
        existingProductIds.add(product.productId); // Met à jour le Set avec le nouvel ID
      }
    });

    this.produitSource.next(currentProducts);
  }

  getValuesDevis(request: ValeursRequest):Observable<Devis[]> {
     // const pageDetails = `_page=1$_limit=5`;

    const { first, rows, sortField, sortOrder } = request;
    const page = (first / rows) + 1;
    let pageDetails = `_page=${page}&_limit=${rows}`;
    if (sortField) {
      pageDetails += `&_sort=${sortField}&_order=${sortOrder === 1 ? 'asc' : 'desc'}`;
    }
    return this._http.get<Devis[]>(`${this.baseUrlDevis}/devis`);
    // const {sortField, sortOrder} =request;
    // const page = (first/rows) +1;
  }
  // recupere LES CLIENTS
  getValuesClient(request: ValeursRequest):Observable<Client[]> {
    // const { first, rows, sortField, sortOrder } = request;
    // const page = (first / rows) + 1;
    // let pageDetails = `_page=${page}&_limit=${rows}`;
    // if (sortField) {
    //   pageDetails += `&_sort=${sortField}&_order=${sortOrder === 1 ? 'asc' : 'desc'}`;
    // }
    return this._http.get<Client[]>(`${this.baseUrlClient}/client`);
  }
  getValuesProduct(request: ValeursRequest):Observable<Product[]> {
    const { first, rows, sortField, sortOrder } = request;
    const page = (first / rows) + 1;
    let pageDetails = `_page=${page}&_limit=${rows}`;
    if (sortField) {
      pageDetails += `&_sort=${sortField}&_order=${sortOrder === 1 ? 'asc' : 'desc'}`;
    }
    return this._http.get<Product[]>(`${this.baseUrlProduct}/topSelling`);
  }
  getCombinedData(request: ValeursRequest):Observable<Devis[]> {
    // const {first, rows, sortField, sortOrder} = requete;
    // const page=(first/rows) +1;
    // let pageDetails = `_page=${page}&_limit=${rows}`;
    //  if(sortField){
    //    pageDetails += `$_sort-${sortField}$_order-${sortOrder === 1? 'asc' : 'desc'}`
    //  }
    return forkJoin([
      this.getValuesDevis(request),
      this.getValuesClient(request),
      this.getValuesProduct(request),
    ]).pipe(
      map(([devis, clients, products]) => {
        return devis.map(d => ({
          ...d,
          // clients: clients,  // Ajoute la liste complète des clients à chaque devis
          // topSellings: products,  // Ajoute la liste complète des clients à chaque devis
          client: clients.find(client => client.clientId === d.clientId),
          topSelling: products.find(product => product.productId === d.productId)
         }));
      })
    );
  }

}
